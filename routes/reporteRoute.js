const router = require('express').Router();
const reporteController = require('../controllers/reporteController');

// Rutas para reportes
router.post('/', reporteController.crearReporte);
router.get('/', reporteController.obtenerReportes);
router.put('/:id', reporteController.actualizarReporte);
router.delete('/:id', reporteController.eliminarReporte);
router.post('/prueba', reporteController.crearReporteprueba);

module.exports = router;