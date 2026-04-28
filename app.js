var express = require('express');
var app = express();
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3005; // puerto 3000 lo usa api back
require('dotenv').config();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'conectado' : 'desconectado' });
});

// ─── Conexión a MongoDB ───────────────────────────────────────────────────────
async function startServer() {
  console.log(`[DB] Conectando a MongoDB...`);

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`[DB] Conexión exitosa a MongoDB Atlas.`);

    app.listen(PORT, () => {
      console.log(`[SERVER] Escuchando en http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error(`[DB] Error al conectar: ${err.message}`);
    process.exit(1);
  }
}

startServer();

module.exports = app;
