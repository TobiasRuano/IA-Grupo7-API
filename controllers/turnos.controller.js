var TurnoService = require('../services/turno.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getTurnos = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Turnos = await TurnoService.getTurnos({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Turnos, message: "Succesfully Turnos Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// ESTA ES LA FUNCION QUE NO DETECTA EL PARAMETRO DE FILTRO
exports.getTurnosbyID = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {userID: req.body.user} //TODO: no detecta el id del usuario a buscar
    console.log("Este es el valor de userID: ")
    console.log(filtro)
    try {
        var Turnos = await TurnoService.getTurnos(filtro, page, limit)
        // Return the Turnos list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Turnos, message: "Succesfully Turnos Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createTurno = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller, ha crear un turno!",req.body)
    var Turno = {
        id: req.body.id,
        userID: req.body.userID,
        razon: req.body.razon,
        fecha: req.body.fecha,
        dniMedico: req.body.dniMedico,
        estado: req.body.estado
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdTurno = await TurnoService.createTurno(Turno)
        return res.status(201).json({createdTurno, message: "Succesfully Created Turno"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Turno Creation was Unsuccesfull"})
    }
}

exports.updateTurnoState = async function (req, res, next) {

    // Id is necessary for the update
    if (!req.body.estado) {
        return res.status(400).json({status: 400., message: "No hay un estado para actualizar"})
    }
    
    var Turno = {
        id: req.body.id ? req.body.id : null,
        estado: req.body.estado ? req.body.estado : null
    }
    try {
        var updatedTurno = await TurnoService.updateTurnoState(Turno)
        return res.status(200).json({status: 200, data: updatedTurno, message: "Succesfully Updated Turno"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeTurno = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await TurnoService.deleteTurno(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}