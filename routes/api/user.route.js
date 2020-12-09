var express = require('express')
var router = express.Router()
var UserController = require('../../controllers/users.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/user.routes');
});
router.post('/registration', UserController.createUser);
router.post('/login/', UserController.loginUser);
router.get('/allusers', Authorization, UserController.getUsers);
router.post('/userbydni', Authorization, UserController.getUsersByDni);
router.get('/medicos', Authorization, UserController.getMedicos);
router.put('/updateuser', Authorization, UserController.updateUser);
router.post('/remove', Authorization, UserController.removeUser);
router.post('/guardarImgUser', UserController.guardarImagenUser);

// Export the Router
module.exports = router;