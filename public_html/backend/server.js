require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Configuración de MercadoPago (modo sandbox)
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
  sandbox: true, // Modo sandbox activado para pruebas
  options: {
    timeout: 30000,
    idempotency: true
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend de Encens funcionando');
});

// Endpoint para crear preferencias
app.post('/api/create-preference', async (req, res) => {
  console.log('Recibiendo solicitud para crear preferencia...');
  
  try {
    const { items, payer } = req.body;

    // Validaciones básicas
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'Items inválidos o vacíos',
        details: 'Debe proporcionar al menos un producto válido en el carrito'
      });
    }

    if (!payer || !payer.email || !payer.name) {
      return res.status(400).json({ 
        error: 'Datos del comprador incompletos',
        details: 'Nombre y email son campos obligatorios'
      });
    }

    // Crear preferencia
    const preference = {
      items: items.map(item => ({
        id: item.id || `item_${Math.random().toString(36).substr(2, 9)}`,
        title: item.title.substring(0, 50),
        description: item.description || `Producto: ${item.linea || 'No especificado'}`,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        currency_id: "ARS"
      })),
      payer: {
        name: payer.name,
        surname: payer.name.split(' ')[1] || payer.name,
        email: payer.email,
        phone: {
          area_code: payer.phone?.area_code || "11",
          number: payer.phone?.number || ""
        }
      },
      payment_methods: {
        excluded_payment_types: [{ id: "atm" }],
        installments: 12
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/success`,
        failure: `${process.env.FRONTEND_URL}/failure`,
        pending: `${process.env.FRONTEND_URL}/pending`
      },
      auto_return: "approved",
      binary_mode: true,
      statement_descriptor: "ENCENS",
      notification_url: `${process.env.BACKEND_URL}/api/webhook`,
      external_reference: `order_${Date.now()}`
    };

    console.log('Creando preferencia en MercadoPago...');
    const response = await mercadopago.preferences.create(preference);

    console.log('Preferencia creada:', response.body.id);
    res.json({
      id: response.body.id,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point
    });

  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({
      error: 'Error al crear preferencia de pago',
      message: error.message,
      details: error.response?.body || null
    });
  }
});

// Endpoint para webhooks
app.post('/api/webhook', (req, res) => {
  console.log('Webhook recibido:', req.body);
  res.status(200).send('OK');
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});