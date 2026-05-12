const reporteRepo = require('../repositories/reporteRepository');

exports.crearReporte = async (req, res) => {
  try {
    const reporteGuardado = await reporteRepo.crear(req.body);
    res.status(201).json(reporteGuardado);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.obtenerReportes = async (req, res) => {
  try {
    const reportes = await reporteRepo.obtenerTodos();
    res.status(200).json(reportes);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.actualizarReporte = async (req, res) => {
  try {
    const reporteActualizado = await reporteRepo.actualizar(req.params.id, req.body);
    if (!reporteActualizado) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.status(200).json(reporteActualizado);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.eliminarReporte = async (req, res) => {
  try {
    const reporteEliminado = await reporteRepo.eliminar(req.params.id);
    if (!reporteEliminado) return res.status(404).json({ error: 'Reporte no encontrado' });
    res.status(200).json({ message: 'Reporte eliminado correctamente' });
  } catch (error) { res.status(500).json({ error: error.message }); }
};

exports.crearReporteprueba = async (req, res) => {
  try {
    const reporteGuardado = await reporteRepo.crear({
      sede: 'Sede de prueba',
      tipo: 'necesidad',
      descripcion: 'Este es un reporte de prueba',
      creadoPor: 'voluntario_prueba'
    });
    res.status(201).json(reporteGuardado);
  } catch (error) { res.status(400).json({ error: error.message }); }
};