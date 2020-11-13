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

exports.getTurnosbyID = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro= {userID: req.body.userID}
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

exports.asignarTurno = async function (req, res, next) {
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
        var createdTurno = await TurnoService.createTurnos(Turno)
        return res.status(201).json({createdTurno, message: "Succesfully Created Turno"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Turno Creation was Unsuccesfull"})
    }
}

exports.generarTurnos = async function (req, res, next) {
    var fecha = req.body.fecha;
    var dniMedico = req.body.dniMedico;
    let arrayTurnos = [];

    //Creo todos los turnos de 9 a 18 en el dia dado.
    let hour = 9;
    let minute = 0;
    for (let index = 0; index < 18; index++) {
        var Turno = {
            userID: "",
            razon: "",
            fecha: new Date(fecha.getFullYear, fecha.getMonth, fecha.getDate, hour, minute),
            dniMedico: dniMedico,
            estado: "Disponible"
        }
        arrayTurnos.push(Turno);
        if (minute == 0) {
            minute = minute + 30;
        } else {
            minute = 0;
            hour = hour + 1;
        }
    }
    
    try {
        // Calling the Service function with the new object from the Request Body
        var createdTurnos = await TurnoService.createTurnos(arrayTurnos)
        return res.status(201).json({createdTurno: createdTurnos, message: "Turnos creados correctamente"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Error en la cracion de turnos"})
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