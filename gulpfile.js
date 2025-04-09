const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const clean = require('gulp-clean');
const webp = require('gulp-webp');
const plumber = require('gulp-plumber');
const order = require('gulp-order');
const htmlmin = require('gulp-htmlmin');

const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    imagenes: 'src/img/**/*',
    backend: 'backend/**/*.js', // Nueva ruta para el backend
    html: 'paginas/*.html' // Nueva ruta para el backend
};

function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('public_html/css'));  // ← Cambiado
}

function javascript() {
    return src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(order([  // Orden explícito
            'src/js/global.js',
            'src/js/db.js',
            'src/js/carrito.js',
            'src/js/app.js',
            'src/js/navScroll.js',
            'src/js/init.js'
        ]))
        .pipe(concat('bundle.min.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('public_html/js'));
}

function imagenes() {
    return src('src/img/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(cache(imagemin({ optimizationLevel: 3 }))) // ← Compresión
        .pipe(dest('public_html/img'));
}

function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('public_html/img'));
}

function copyHtml() {
    return src(paths.html)  // Ahora usa la ruta definida
        .pipe(dest('public_html'));
}

function minifyHtml() {
    return src(paths.html)
        .pipe(htmlmin({ 
            collapseWhitespace: true,
            removeComments: true  // Opcional: elimina comentarios
        }))
        .pipe(dest('public_html'));
}

// Nueva tarea para el backend
function backend() {
    return src([
        'backend/server.js',
        'backend/controllers/*.js',
        'backend/models/*.js',
        'backend/routes/*.js',
        'backend/package.json',
        'backend/package-lock.json',
        '!backend/.env' // ← Excluye .env
    ], { allowEmpty: true })
    .pipe(plumber()) // ← Manejo de errores
    .pipe(dest('public_html/backend'));
}

function watchArchivos() {
    watch(paths.scss, css);
    watch(paths.js, javascript);
    watch(paths.imagenes, imagenes);
    watch(paths.imagenes, versionWebp);
    watch(paths.backend, backend); // Observa cambios en el backend
}

function limpiarBuild() {
    return src('public_html', {read: false, allowEmpty: true})
        .pipe(clean());
}

exports.css = css;
exports.javascript = javascript;
exports.imagenes = imagenes;
exports.backend = backend; // Exporta la nueva tarea
exports.limpiar = limpiarBuild;
exports.watchArchivos = watchArchivos;
exports.default = series(
    limpiarBuild,
    parallel(css, javascript, imagenes, versionWebp, backend, copyHtml),
    watchArchivos
);

exports.prod = series(
    limpiarBuild,
    parallel(css, javascript, imagenes, versionWebp, backend, copyHtml, minifyHtml)
);