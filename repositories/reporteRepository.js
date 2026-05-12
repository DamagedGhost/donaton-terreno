const Reporte = require('../models/Reporte');

class ReporteRepository {
  async crear(datos) { return await new Reporte(datos).save(); }
  async obtenerTodos() { return await Reporte.find(); }
  async actualizar(id, datos) { return await Reporte.findByIdAndUpdate(id, datos, { new: true }); }
  async eliminar(id) { return await Reporte.findByIdAndDelete(id); }
}

module.exports = new ReporteRepository();
