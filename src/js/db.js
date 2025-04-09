function normalizarTexto(texto) {
    return texto.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

function verificarImagen(url) {
    const img = new Image();
    img.src = url;
    return img.complete || img.width > 0;
}

const catalogo = {
    "Satya": {
        "Nag Champa": {
            precio: 1400,
            aromas: [
                {nombre: "Nag Champa", stock: 5}
            ]
        },
        "Series": {
            precio: 1200,
            aromas: [
                {nombre: 'AYURVEDA TRADICIONAL', stock: 2},
                {nombre: 'CINNAMON', stock: 1},
                {nombre: 'CITRONELLA', stock: 1},
                {nombre: 'DRAGON BLOOD', stock: 1},
                {nombre: 'EUCALIPTO', stock: 3},
                {nombre: 'GOLD', stock: 1},
                {nombre: 'INCIENSO', stock: 1},
                {nombre: 'JAZMIN', stock: 0},
                {nombre: 'KARMA', stock: 0},
                {nombre: 'LAVANDA', stock: 0},
                {nombre: 'LEMONGRASS', stock: 1},
                {nombre: 'MEDITACION', stock: 1},
                {nombre: 'MIRRA', stock: 0},
                {nombre: 'MONEY', stock: 0},
                {nombre: 'MUSK', stock: 1},
                {nombre: 'NAMASTE', stock: 1},
                {nombre: 'OODH', stock: 1},
                {nombre: 'OPIUM', stock: 5},
                {nombre: 'PALO SANTO', stock: 1},
                {nombre: 'PATCHOULY', stock: 1},
                {nombre: 'REIKI', stock: 6},
                {nombre: 'ROSA', stock: 1},
                {nombre: 'ROSEMARY', stock: 1},
                {nombre: 'RUDA', stock: 7},
                {nombre: 'SALVIA BLANCA', stock: 1},
                {nombre: 'SANACION ESPIRITUAL', stock: 1},
                {nombre: 'SANDALO WOOD', stock: 1},
                {nombre: 'TULSI', stock: 1},
                {nombre: 'VAINILLA', stock: 1},
                {nombre: 'VIBRAS POSITIVAS', stock: 1}
            ]
        },
        "Super Hit": {
            precio: 1600,
            aromas: [
                {nombre: "Super Hit", stock: 5}
            ]
        },
        "Super Hit Series": {
            precio: 1500,
            aromas: [
                {nombre: 'ARABIAN NIGHT', stock: 0},
                {nombre: 'BLUE BELL', stock: 3},
                {nombre: 'DERI AROMA', stock: 3},
                {nombre: 'DHARMA', stock: 3},
                {nombre: 'PURPLE BEAUTY', stock: 3},
                {nombre: 'YOGA RITUAL', stock: 3}
            ]
        }
    },

    // Aromanza
    "Aromanza": {
        "Aceites Esenciales": {
            precio: 1800,
            aromas: ["Lavanda",
                {nombre: "Eucalipto", stock: 2},
                {nombre: "Citronela", stock: 2}
            ]
        }
    },

    // Sagrada Madre
    "Sagrada Madre": {
        "Palo Santo Sustentable": {
            precio: 1800,
            aromas: [
                {nombre: "Copal", stock: 4},
                {nombre: "Lavanda", stock: 2},
                {nombre: "Incienso", stock: 2},
                {nombre: "Sustentable", stock: 2},
                {nombre: "Sándalo", stock: 2},
                {nombre: "Romero", stock: 2},
                {nombre: "Rosas", stock: 2},
                {nombre: "Mirra", stock: 2},
                {nombre: "Champa", stock: 2},
                {nombre: "Fresias", stock: 2},
                {nombre: "Vainilla", stock: 2},
                {nombre: "Yagra", stock: 2},
                {nombre: "Ruda", stock: 2},
                {nombre: "Jazmin", stock: 2},
                {nombre: "Pachuli", stock: 2},
                {nombre: "Violetas", stock: 2},
                {nombre: "Salvia", stock: 2},
                {nombre: "canela", stock: 2}
            ]
        },
        "Natural": {
            precio: 1800,
            aromas: [
                {nombre: "Citronela - Palo Santo - Naranja", stock: 4},
                {nombre: "Copal", stock: 1},
                {nombre: "Incienso", stock: 1},
                {nombre: "Mirra", stock: 1},
                {nombre: "Ruda - Romero - Incienso", stock: 1},
                {nombre: "Sándalo", stock: 1},
                {nombre: "Yagra", stock: 1},
                {nombre: "Pachuli", stock: 1},
                {nombre: "Ámbar", stock: 1},
                {nombre: "Benjui", stock: 1},
                {nombre: "Mirra - Olíbano", stock: 1},
                {nombre: "Salvia Blanca", stock: 1}
            ]
        },
        "Cannabis": {
            precio: 1800,
            aromas: [
                {nombre: "Purple Hindu Kush", stock:3},
                {nombre: "Lemon Haze", stock: 1},
                {nombre: "Tropicana Cookies", stock: 1},
                {nombre: "Blue Dream", stock: 1},
                {nombre: "Mango Kush", stock: 1},
                {nombre: "White Widow", stock: 1}
            ]
        },
        "Yagra": {
            precio: 1800,
            aromas: [
                {nombre: "Rosa - Vainilla", stock: 3},
                {nombre: "Violetas - Lavanda", stock: 1},
                {nombre: "Orquídeas - Laurel", stock: 1},
                {nombre: "Manzanilla - Olíbano", stock: 1}]
        },
        "Blend Masala": {
            precio: 1800,
            aromas: [
                {nombre: "Maha Masala", stock: 2},
                {nombre: "Gaia Masala", stock: 1}
            ]
        },
        "5 Elementos": {
            precio: 1800,
            aromas: [
                {nombre: "Renacer - Agua", stock: 1},
                {nombre: "Armonía - Tierra", stock: 1},
                {nombre: "Alegría - Aire", stock: 1},
                {nombre: "Fuerza - Fuego", stock: 1},
                {nombre: "Claridad - Ether", stock: 1}]
        },
        "Botánico": {
            precio: 1800,
            aromas: [
                {nombre: "Gardenias - Caléndula", stock: 2},
                {nombre: "Jazmín - Rosas", stock: 1},
                {nombre: "Té Verde - Champa", stock: 1},
                {nombre: "Magnolias", stock: 1},
                {nombre: "Fresias", stock: 1},
                {nombre: "Nardo - Olíbano", stock: 1},
                {nombre: "Clavo de Olor - Rosas", stock: 1}]
        },
        "Hiervas y Flores": {
            precio: 1800,
            aromas: [
                {nombre: "Anís - Canela - Olíbano", stock: 3},
                {nombre: "Caléndula - Manzanilla - Olíbano", stock: 1},
                {nombre: "Eucalipto - Laurel - Cedro", stock: 1},
                {nombre: "Incienso Blanco", stock: 1},
                {nombre: "Lavanda y Olíbano", stock: 1},
                {nombre: "Rosas - Olíbano", stock: 1},
                {nombre: "Salvia Blanca", stock: 1}]
        },
        "Patagonia": {
            precio: 1800,
            aromas: [
                {nombre: "Jazmín", stock: 2},
                {nombre: "Naranja - Vainilla", stock: 1},
                {nombre: "Neroli", stock: 1},
                {nombre: "Palmarosa", stock: 1},
                {nombre: "Rosa Mosqueta", stock: 1},
                {nombre: "Ruda", stock: 1},
                {nombre: "Tilo", stock: 1},
                {nombre: "Lavanda Silvestre", stock: 1},
                {nombre: "Hibiscus", stock: 1},
                {nombre: "Yerba Mate", stock: 1},
                {nombre: "Algarroba - Vainilla", stock: 1},
                {nombre: "Limón", stock: 1}]
        },
        "Energía Limpia": {
            precio: 1800,
            aromas: [
                {nombre: "Renacer", stock: 2},
                {nombre: "Revitalizar", stock: 3},
                {nombre: "Armonizar", stock: 3},
                {nombre: "Sanar", stock: 3}]
        },
        "Triple Combinado": {
            precio: 1800,
            aromas: [
                {nombre: "Triple Combinado", stock: 4},
            ]
        },
        "DÚO": {
            precio: 1800,
            aromas: [
                {nombre: "Limpieza - Armonía", stock: 1},
                {nombre: "Fortuna - Purifiación", stock: 2},
                {nombre: "7 Poderes - Renacer", stock: 2},
                {nombre: "Sanación - Apertura", stock: 2}]
        },
        "Artesano x30": {
            precio: 1800,
            aromas: [
                {nombre: "Lavanda", stock: 1},
                {nombre: "Rosas", stock: 2},
                {nombre: "Yagra", stock: 2},
                {nombre: "Sándalo", stock: 2},
                {nombre: "Copal", stock: 2},
                {nombre: "Incienso", stock: 2},
                {nombre: "Ruda - Romero - Incienso", stock: 2},
                {nombre: "Palo Santo", stock: 2},
                {nombre: "Palo Santo - Vainilla", stock: 2},
                {nombre: "Palo Santo - Champa", stock: 2},
                {nombre: "Palo Santo - Rosa", stock: 2},
                {nombre: "Palo Santo - Jazmín", stock: 2},
                {nombre: "Palo Santo - Lavanda", stock: 2},
                {nombre: "Té Verde - Flor de Champa", stock: 2},
                {nombre: "Gardenias - Caléndula", stock: 2},
                {nombre: "Jazmín - Rosa", stock: 2},
                {nombre: "Lemon Grass - Olíbano", stock: 2},
                {nombre: "Flor del Árbol Paraíso", stock: 2},
                {nombre: "Sangre de Drago", stock: 2},
                {nombre: "Palo Santo - Jengibre", stock: 2},
                {nombre: "Reina de la Noche - Lavanda", stock: 2},
                {nombre: "Citronella - Naranja - Palo Santo", stock: 2},
                {nombre: "Magnolias", stock: 2},
                {nombre: "Clavo de Olor - Rosas", stock: 2},
                {nombre: "Nardo - Olíbano", stock: 2},
                {nombre: "Palo Santo Yagra", stock: 2},
                {nombre: "Citronella del Norte", stock: 2}]
        },
        "Artesano x5": {
            precio: 1800,
            aromas: [
                {nombre: "Incienso", stock: 1},
                {nombre: "Palo Santo - Incienso", stock: 2},
                {nombre: "Palo Santo - Lavanda", stock: 2},
                {nombre: "Palo Santo - Romero", stock: 2},
                {nombre: "Palo Santo - Ruda", stock: 2},
                {nombre: "Ruda - Romero - Incienso", stock: 2},
                {nombre: "Sándalo", stock: 2},
                {nombre: "Yagra", stock: 2},
                {nombre: "Palo Santo", stock: 2},
                {nombre: "Palo Santo - Fresias", stock: 2},
                {nombre: "Palo Santo - Pachuli", stock: 2},
                {nombre: "Palo Santo - Sándalo", stock: 2}]
        },
        "7 Chakras": {
            precio: 1800,
            aromas: [
                {nombre: "7 Chakras", stock : 1},
            ]
        },
        "Sagrado": {
            precio: 1800,
            aromas: [
                {nombre: "Amor Eterno", stock: 2},
                {nombre: "Encuentro Divino", stock: 1},
                {nombre: "Guía Espiritual", stock: 1},
                {nombre: "Tercer Ojo", stock: 1},
                {nombre: "Kundalini", stock: 1},
                {nombre: "Yoga", stock: 1},
                {nombre: "Meditación", stock: 1},
                {nombre: "Samadhi", stock: 1}]
        },
        "Ritual": {
            precio: 1800,
            aromas: [
                {nombre: "Limpieza Energética", stock: 2},
                {nombre: "Luna Llena", stock: 1},
                {nombre: "Tranquilidad", stock: 1},
                {nombre: "Purificación", stock: 1},
                {nombre: "Brillar", stock: 1},
                {nombre: "Fuerza Interior", stock: 1},
                {nombre: "Amor Propio", stock: 1},
                {nombre: "Ritual del Cacao", stock: 1},
                {nombre: "Abundancia", stock: 1},
                {nombre: "Manifestar", stock: 1},
                {nombre: "Gratitud", stock: 1},
                {nombre: "Empoderamiento", stock: 1}]
        },
        "Palo Santo Sustentable x4": {
            precio: 1800,
            aromas: [
                {nombre: "Palo Santo", stock: 2},
                {nombre: "Palo Santo - Sándalo", stock: 1},
                {nombre: "Palo Santo - Olíbano", stock: 1},
                {nombre: "Palo Santo - Lavanda", stock: 1}]
        },
        "India Masala": {
            precio: 1800,
            aromas: [
                {nombre: "Sol: Fuerza y Energía", stock: 2},
                {nombre: "Día: Enfoque y Claridad", stock: 1},
                {nombre: "Luz: Guía Espiritual", stock: 1},
                {nombre: "Alma: Calma y Conexión", stock: 1}]
        },
        "India Black": {
            precio: 1800,
            aromas: [
                {nombre: "Luna - Intuición", stock: 2},
                {nombre: "Noche - Amor Eterno", stock: 1},
                {nombre: "Enigma: Guía Espiritual", stock: 1},
                {nombre: "Divina - Crecer", stock: 1},
                {nombre: "Astro: Fuerza Interior", stock: 1},
                {nombre: "Origen - Confianza", stock: 1},
                {nombre: "Brisa - Calma", stock: 1},
                {nombre: "Mystic - Magia", stock: 1},
                {nombre: "Energía - Expansión", stock: 1},
                {nombre: "Brillo Iluminación", stock: 1},
                {nombre: "Cosmos - Conexón", stock: 1},
                {nombre: "Eclipse - Unión", stock: 1}]
        },
        "Bombita Defumación x4": {
            precio: 1800,
            aromas: [
                {nombre: "7 Hierbas Copal", stock: 2},
                {nombre: "7 Elementos Puros", stock: 1},
                {nombre: "abre caminos", stock: 1},
                {nombre: "defumación completa", stock: 1},
                {nombre: "atrae dinero", stock: 1},
                {nombre: "destrabe", stock: 1},
                {nombre: "limpieza energética", stock: 1},
                {nombre: "palo santo", stock: 1},
                {nombre: "7 poderes", stock: 1},
                {nombre: "abundancia infinita", stock: 1},
                {nombre: "limpieza aurica", stock: 1},
                {nombre: "atracción mística", stock: 1}]
        },
        "Bombita Herbal x4": {
            precio: 1800,
            aromas: [
                {nombre: "fortuna", stock: 2},
                {nombre: "amor", stock: 1},
                {nombre: "armonía", stock: 1},
                {nombre: "renacer", stock: 1},
                {nombre: "7 poderes", stock: 1},
                {nombre: "destrabar", stock: 1},
                {nombre: "purificar", stock: 1},
                {nombre: "protección", stock: 1}]
        },
        "Bombita Defumación x8": {
            precio: 1800,
            aromas: [
                {nombre: "Yagra - Canela", stock: 2},
                {nombre: "benjuí - almizcle", stock: 1},
                {nombre: "limpieza energética", stock: 1},
                {nombre: "7 elementos puros", stock: 1},
                {nombre: "mirra - incienso", stock: 1},
                {nombre: "palo santo", stock: 1},
                {nombre: "7 hierbas copal", stock: 1},
                {nombre: "estoraque", stock: 1}]
        },
        "Bombita Defumación Premium x8": {
            precio: 1800,
            aromas: [
                {nombre: "olíbano - lavanda", stock: 2},
                {nombre: "olíbano - naranja", stock: 1},
                {nombre: "olíbano - salvia", stock: 1},
                {nombre: "olíbano - sándalo", stock: 1},
                {nombre: "olíbano - palo santo", stock: 1},
                {nombre: "olíbano - rosas", stock: 1},
                {nombre: "olíbano - canela", stock: 1},
                {nombre: "olíbano - manzanilla", stock: 1}]
        },
        "Bomba Herbal XL": {
            precio: 1800,
            aromas: [
                {nombre: "energía limpia", stock: 2},
                {nombre: "purificación", stock: 1}]
        },
        "Bombita 7 Chakras": {
            precio: 1800,
            aromas: [
                {nombre: "Bombita 7 Chakras", stock: 2},
            ]
        },
        "Bombita de Defumación Activada x25": {
            precio: 1800,
            aromas: [
                {nombre: "7 hierbas copal", stock: 2},
                {nombre: "7 poderes", stock: 3},
                {nombre: "abre caminos", stock: 3},
                {nombre: "atracción mística", stock: 3},
                {nombre: "atrae dinero", stock: 3},
                {nombre: "defumación completa", stock: 3},
                {nombre: "destrabe", stock: 3},
                {nombre: "fuerza infinita", stock: 3},
                {nombre: "limpieza aurica", stock: 3},
                {nombre: "limpieza energética", stock: 3},
                {nombre: "palo santo", stock: 3}]
        },
        "Cosmos": {
            precio: 1800,
            aromas: [
                {nombre: "Cosmos", stock: 3}
            ]
        },
        "Bombita Ritual": {
            precio: 1800,
            aromas: [
                {nombre: "abundancia", stock: 1},
                {nombre: "amor propio", stock: 1},
                {nombre: "brillar", stock: 1},
                {nombre: "ritual del cacao", stock: 1},
                {nombre: "empoderamiento", stock: 1},
                {nombre: "fuerza interior", stock: 1},
                {nombre: "gratitud", stock: 1},
                {nombre: "limpieza energética", stock: 1},
                {nombre: "luna llena", stock: 1},
                {nombre: "manifestar", stock: 1},
                {nombre: "purificación", stock: 1},
                {nombre: "tranquilidad", stock: 1}]
        },
        "Kits Surtidos": {
            precio: 1800,
            aromas: [
                {nombre: "Kit pétalos de amor", stock: 1},
                {nombre: "kit limpieza energética", stock: 1},
                {nombre: "kit turmalina", stock: 1},
                {nombre: "kit luz", stock: 1},
                {nombre: "kit astral", stock: 1}]
        },
        "kit herbal": {
            precio: 1800,
            aromas: [
                {nombre: "prosperidad", stock: 1},
                {nombre: "protección y sanación", stock: 1},
                {nombre: "relajación y armonización", stock: 1},
                {nombre: "purificación", stock: 1}]
        },
        "kit humito sagrado": {
            precio: 1800,
            aromas: [
                {nombre: "7 energía", stock: 1},
                {nombre: "armonía", stock: 1},
                {nombre: "prosperidad", stock: 1},
                {nombre: "energía limpia", stock: 1},
                {nombre: "purificación", stock: 1},
                {nombre: "amor y unión", stock: 1},
                {nombre: "protección", stock: 1}]
        },
        "incienso en polvo": {
            precio: 1800,
            aromas: [
                {nombre: "Sándalo", stock: 1},
                {nombre: "limpieza energética", stock: 1},
                {nombre: "palo santo", stock: 1},
                {nombre: "7 poderes", stock: 1},
                {nombre: "rosas", stock: 1},
                {nombre: "jazmín", stock: 1},
                {nombre: "citronella - naranja", stock: 1},
                {nombre: "vainilla - incienso", stock: 1},
                {nombre: "yagra - madera de oriente", stock: 1},
                {nombre: "benjui - estoraque", stock: 1},
                {nombre: "alcanfor - laurel", stock: 1},
                {nombre: "lavanda", stock: 1}]
        },
        "pirámide energética": {
            precio: 1800,
            aromas: [
                {nombre: "rosas", stock: 1},
                {nombre: "yagra - incienso", stock: 1},
                {nombre: "olíbano puro", stock: 1},
                {nombre: "7 hierbas olíbano", stock: 1},
                {nombre: "4 poderes", stock: 1},
                {nombre: "canela - olíbano", stock: 1},
                {nombre: "manzanilla - olíbano", stock: 1},
                {nombre: "romero - olíbano", stock: 1},
                {nombre: "citronella - caléndula - ruda", stock: 1}]
        },
        "incienso en cono": {
            precio: 1800,
            aromas: [
                {nombre: "caléndula - romero", stock: 1},
                {nombre: "pachuli - palo santo", stock: 1},
                {nombre: "pétalos de rosas", stock: 1},
                {nombre: "sándalo - yagra", stock: 1},
                {nombre: "canela - vainilla", stock: 1},
                {nombre: "sándalo - copal", stock: 1},
                {nombre: "citronela - naranja", stock: 1},
                {nombre: "ambar - naranja", stock: 1},
                {nombre: "lavanda - flores violetas", stock: 1},
                {nombre: "té verde", stock: 1},
                {nombre: "ruda - romero", stock: 1},
                {nombre: "flor de champa", stock: 1}]
        },
        "geometría sagrada": {
            precio: 1800,
            aromas: [
                {nombre: "benjui - yagra", stock: 1},
                {nombre: "incienso - ambar", stock: 1},
                {nombre: "rosas - incienso", stock: 1},
                {nombre: "sándalo", stock: 1},
                {nombre: "palo santo - mirra", stock: 1},
                {nombre: "31 hierbas", stock: 1}]
        },
        "pastillas de defumación x4": {
            precio: 1800,
            aromas: [
                {nombre: "incienso", stock: 1},
                {nombre: "salvia blanca", stock: 1},
                {nombre: "ruda", stock: 1},
                {nombre: "lavanda", stock: 1},
                {nombre: "anís - canela - romero", stock: 1},
                {nombre: "palo santo", stock: 1}]
        },
        "siete días de limpieza": {
            precio: 1800,
            aromas: [
                {nombre: "limpieza surtidas", stock: 2},
                {nombre: "sándalo - yagra", stock: 1},
                {nombre: "copal - vainilla", stock: 1},
                {nombre: "mirra - benjuí", stock: 1},
                {nombre: "rosa - lavanda", stock: 1},
                {nombre: "incienso sándalo", stock: 1}]
        },
        "Sahumitos x5": {
            precio: 1800,
            aromas: [
                {nombre: "7 hierbas", stock: 2},
                {nombre: "canela - anís", stock: 1},
                {nombre: "palo santo", stock: 1},
                {nombre: "sándalo", stock: 1},
                {nombre: "incienso", stock: 1},
                {nombre: "naranja - citronella", stock: 1},
                {nombre: "estoraque - alcanfor", stock: 1},
                {nombre: "ruda", stock: 1},
                {nombre: "salvia blanca", stock: 1},
                {nombre: "rosas", stock: 1},
                {nombre: "mirra - palo santo", stock: 1},
                {nombre: "hierbas y maderas", stock: 1},
                {nombre: "resinas y especias", stock: 1},
                {nombre: "flores aromáticas", stock: 1},
                {nombre: "copal", stock: 1},
                {nombre: "blanco yagra", stock: 1},
                {nombre: "romero", stock: 1},
                {nombre: "calendula - manzanilla", stock: 1}]
        },
        "sahumito x1": {
            precio: 1800,
            aromas: [
                {nombre: "7 hierbas", stock: 2},
                {nombre: "canela - anís", stock: 1},
                {nombre: "copal", stock: 1},
                {nombre: "palo santo", stock: 1},
                {nombre: "sándalo", stock: 1},
                {nombre: "naranja - citronella", stock: 1},
                {nombre: "rosas", stock: 1},
                {nombre: "ruda", stock: 1},
                {nombre: "salvia blanca", stock: 1},
                {nombre: "blanco yagra", stock: 1},
                {nombre: "estoraque - alcanfor", stock: 1},
                {nombre: "incienso", stock: 1},
                {nombre: "mirra - palo santo", stock: 1},
                {nombre: "romero", stock: 1}]
        },
        "sahumos medianos y grandes": {
            precio: 1800,
            aromas: [
                {nombre: "10 hierbas", stock: 2},
                {nombre: "copal", stock: 1},
                {nombre: "mirra - palo santo", stock: 1},
                {nombre: "lavanda", stock: 1},
                {nombre: "limpieza energética", stock: 1},
                {nombre: "sándalo", stock: 1},
                {nombre: "salvia", stock: 1}]
        },
        "Palo Santo stick": {
            precio: 1800,
            aromas: [
                {nombre: "blend herbal", stock: 1},
            ]
        },
        "perlas aromáticas en saquitos": {
            precio: 1800,
            aromas: [
                {nombre: "jazmín", stock: 2},
                {nombre: "lavanda", stock: 1},
                {nombre: "rosas", stock: 1},
                {nombre: "limón", stock: 1}]
        },
        "perlas aromáticas en caja": {
            precio: 1800,
            aromas: [
                {nombre: "vainilla", stock: 2},
                {nombre: "frutilla", stock: 1},
                {nombre: "jazmín", stock: 1},
                {nombre: "lavanda", stock: 1},
                {nombre: "rosas", stock: 1},
                {nombre: "flores", stock: 1},
                {nombre: "coco", stock: 1},
                {nombre: "primavera", stock: 1},
                {nombre: "limón", stock: 1},
                {nombre: "hindu", stock: 1},
                {nombre: "reina de la noche", stock: 1},
                {nombre: "sándalo", stock: 1}]
        },
        "cristales de luz": {
            precio: 1800,
            aromas: [
                {nombre: "vainilla - orquídeas negras", stock: 2},
                {nombre: "flor de champa", stock: 1},
                {nombre: "laurel y orquídeas", stock: 1},
                {nombre: "violeta - lavanda", stock: 1}]
        },
        "aceite esencial de oleum": {
            precio: 1800,
            aromas: [
                {nombre: "revitalizante", stock: 2},
                {nombre: "relajante", stock: 1},
                {nombre: "armonía", stock: 1},
                {nombre: "purificación", stock: 1},
                {nombre: "equilibrio", stock: 1},
                {nombre: "limpieza energética", stock: 1},
                {nombre: "calma", stock: 1},
                {nombre: "energía renovada", stock: 1},
                {nombre: "afrodisíaco", stock: 1},
                {nombre: "concentración", stock: 1},
                {nombre: "incienso", stock: 1}]
        },
        "esencias para hornillo": {
            precio: 1800,
            aromas: [
                {nombre: "rosas", stock: 2},
                {nombre: "vainilla", stock: 1},
                {nombre: "lavanda", stock: 1},
                {nombre: "coco", stock: 1},
                {nombre: "jazmín", stock: 1},
                {nombre: "incienso", stock: 1},
                {nombre: "mirra", stock: 1},
                {nombre: "peras y flores blancas", stock: 1},
                {nombre: "limón", stock: 1},
                {nombre: "sándalo", stock: 1}]
        },
        "Hiervas en sobre": {
            precio: 1800,
            aromas: [
                {nombre: "caléndula", stock: 2},
                {nombre: "lemongrass", stock: 1},
                {nombre: "contrayerba", stock: 1},
                {nombre: "ruda", stock: 1},
                {nombre: "eucalipto", stock: 1},
                {nombre: "lavanda", stock: 1},
                {nombre: "rosa", stock: 1},
                {nombre: "romero", stock: 1},
                {nombre: "salvia", stock: 1},
                {nombre: "manzanilla", stock: 1},
                {nombre: "jarilla", stock: 1},
                {nombre: "té verde", stock: 1},
                {nombre: "naranja", stock: 1},
                {nombre: "laurel", stock: 1}]
        },
        "hiervas y resinas por kilo": {
            precio: 1800,
            aromas: [
                {nombre: "sangre de drago", stock: 2},
                {nombre: "lavanda premium", stock: 1},
                {nombre: "mirra", stock: 1},
                {nombre: "sándalo", stock: 1},
                {nombre: "estoraque premium", stock: 1}]
        },
        "Bomba carbón x12": {
            precio: 1800,
            aromas: [
                {nombre: "lavanda", stock: 2},
                {nombre: "incienso", stock: 1},
                {nombre: "yagra", stock: 1},
                {nombre: "citronella - naranja", stock: 1},
                {nombre: "limpieza energética", stock: 1},
                {nombre: "7 poderes", stock: 1}]
        },
        "Bomba carbón x24": {
            precio: 1800,
            aromas: [
                {nombre: "citronella - naranja", stock: 2},
                {nombre: "limpieza energética", stock: 1},
                {nombre: "incienso", stock: 1},
                {nombre: "yagra", stock: 1},
                {nombre: "lavnada", stock: 1},
                {nombre: "7 poderes", stock: 1}]
        },
        "Carbón redondo neutro": {
            precio: 1800,
            aromas: [
                {nombre: "Carbón Redondo Neutro", stock: 2}]
        }
    }
    // ¡Agrega más marcas aquí!
};

const productos = [];

for(const [marca, lineas] of Object.entries(catalogo)) {
    for(const [linea, datos] of Object.entries(lineas)) {
        // Cambia la ruta para que sea relativa al root
        const imagen = `../../build/img/${normalizarTexto(marca)}-${normalizarTexto(linea)}.jpg`;
        productos.push({
            imagen: imagen,
            marca: marca,
            linea: linea,
            precio: `<span>$</span>${datos.precio}`, // Usar template string
            id: `${marca}-${linea}`.replace(/\s+/g, "-").toLowerCase()
        });
    }
}

console.log(productos); // Base de datos limpia

// Al final del archivo db.js
window.productos = productos; // Hace disponible productos globalmente
window.catalogo = catalogo; // Añadir al final