var express = require('express')
var router = express.Router()
var TurnoController = require('../../controllers/turnos.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/turnos.routes');
});
router.post('/nuevoturno', TurnoController.createTurno)
router.get('/', Authorization, TurnoController.getTurnos)
router.post('/misturnos', Authorization, TurnoController.getTurnosbyID)
router.delete('/:id', Authorization, TurnoController.removeTurno)

// Export the Router
module.exports = router;