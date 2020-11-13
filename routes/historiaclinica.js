var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Llegaste al router de Historias Clinicas');
});

module.exports = router;
