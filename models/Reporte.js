const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  sede: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['necesidad', 'inventario', 'emergencia'],
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  items: [
    {
      nombre: String,
      cantidad: Number,
      urgencia: { type: String, enum: ['baja', 'media', 'alta'] }
    }
  ],
  estado: {
    type: String,
    enum: ['pendiente', 'en_proceso', 'resuelto'],
    default: 'pendiente'
  },
  creadoPor: {
    type: String, // id del voluntario o coordinador
    required: true
  }
}, { timestamps: true }); // agrega createdAt y updatedAt solo

module.exports = mongoose.model('Reporte', reporteSchema);