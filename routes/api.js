/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var turnos = require('./api/turno.route.js')
var recetas = require('./api/receta.route.js')

router.use('/users', users);
router.use('/turnos', turnos);
route.use('/recetas',recetas);

module.exports = router;
