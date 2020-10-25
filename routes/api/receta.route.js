var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/recetas.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/recetas.routes');
});

router.post('/recetas', UserController.createReceta)

router.delete('/:id', Authorization, UserController.removeReceta)

//subir imagen/archivo


//router.put('/', Authorization, UserController.updateUser)
//router.post('/guardarImgUser',UserController.guardarImagenUser)

// Export the Router
module.exports = router;



//api/users
//api/users/registration
//api/users/login