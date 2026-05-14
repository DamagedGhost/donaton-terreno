const crypto = require('crypto');
if (!global.crypto) global.crypto = crypto.webcrypto;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const mongoose = require('mongoose'); 
const reporteRoute = require('./routes/reporteRoute');

const app = express();

const PORT = process.env.PORT || 3003;

// Middlewares de seguridad
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'conectado' : 'desconectado' });
});

// Rutas (usamos la raíz para que conecte bien con el API Gateway)
app.use('/', reporteRoute);

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log(`--- Conexión exitosa a MongoDB Atlas ---`);
    app.listen(PORT, () => {
      console.log(`✅ Servicio Terreno escuchando en puerto ${PORT}: http://localhost:${PORT}/`);
    });
  })
  .catch(err => {
    console.error(`❌ Error al conectar a MongoDB: ${err.message}`);
    process.exit(1);
  });