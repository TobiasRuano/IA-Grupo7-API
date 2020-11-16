var express = require('express')
var router = express.Router()
var RecetaController = require('../../controllers/recetas.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/recetas.routes');
});

router.post('/nuevareceta', RecetaController.createReceta)
router.post('/misrecetas', Authorization, RecetaController.getRecetasByID)
router.delete('/:id', Authorization, RecetaController.removeReceta)
router.post('/uploadfiles',RecetaController.uploadFiles)//subir imagen/archivo
router.get('/recetas:nombreImagen',RecetaController.downloadFiles)//descargar imagen/archivo

//subir imagen/archivo


//router.put('/', Authorization, UserController.updateUser)
//router.post('/guardarImgUser',UserController.guardarImagenUser)

// Export the Router
module.exports = router;