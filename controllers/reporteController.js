const reporte = require('../models/reporte');

exports.crearReporte = async (req, res) => {
  try {
    const nuevoReporte = new reporte(req.body);
    const reporteGuardado = await nuevoReporte.save();
    res.status(201).json(reporteGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.obtenerReportes = async (req, res) => {
  try {
    const reportes = await reporte.find();
    res.status(200).json(reportes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarReporte = async (req, res) => {
  try {
    const reporteActualizado = await reporte.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reporteActualizado) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    res.status(200).json(reporteActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 
exports.eliminarReporte = async (req, res) => {
  try {
    const reporteEliminado = await reporte.findByIdAndDelete(req.params.id);
    if (!reporteEliminado) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    res.status(200).json({ message: 'Reporte eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearReporteprueba = async (req, res) => {
  try {
    const nuevoReporte = new reporte({
      sede: 'Sede de prueba',
      tipo: 'necesidad',
      descripcion: 'Este es un reporte de prueba',
      items: [
        {
          nombre: 'Elemento de prueba',
          cantidad: 1,
          urgencia: 'media'
        }
      ],
      estado: 'pendiente',
      creadoPor: 'voluntario_prueba'
    });
    const reporteGuardado = await nuevoReporte.save();
    res.status(201).json(reporteGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
