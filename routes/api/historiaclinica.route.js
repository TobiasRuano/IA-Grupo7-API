var express = require('express')
var router = express.Router()
var HistoriaClinicaController = require('../../controllers/historiaclinica.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de api/historiaclinica.routes');
});

router.post('/nuevahistoriaclinica', HistoriaClinicaController.createHistoriaClinica)
router.post('/obtenerhistoriaclinica', Authorization, HistoriaClinicaController.getHistoriaClinicasByID)
router.delete('/:id', Authorization, HistoriaClinicaController.removeHistoriaClinica)

// Export the Router
module.exports = router; 