var RecetaService = require('../services/receta.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getRecetasByID = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = {userID: req.body.userID}
    console.log(filtro)
    try {
        var Recetas = await RecetaService.getRecetas(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Recetas, message: "Succesfully Recetas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createReceta= async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller, ha crear una Receta",req.body)
    var Receta = {
        
        id: req.body.id,
        fecha: req.body.fecha,
        nombreMedico: req.body.nombreMedico,
        comentario: req.body.comentario,
        userID: req.body.userID
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdReceta= await RecetaService.createReceta(Receta)
        return res.status(201).json({createdReceta, message: "Succesfully Created Receta"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Receta Creation was Unsuccesfull"})
    }
}

exports.removeReceta = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await RecetaService.deleteReceta(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
