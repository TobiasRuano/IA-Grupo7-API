var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Llegaste al router de Recetas directo');
});

module.exports = router;
