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
    var limit = req.query.limit ? req.query.limit : 20;
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
    var Turno = {
        id: req.body.id,
        userID: req.body.userID,
        razon: req.body.razon,
        fecha: req.body.fecha,
        dniMedico: req.body.dniMedico,
        estado: req.body.estado
    }
    try {
        var createdTurno = await TurnoService.actualizarTurno(Turno)
        return res.status(201).json({createdTurno, message: "Turno Actualizado Correctamente"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Error en la actualizacion del turno"})
    }
}

exports.generarTurnos = async function (req, res, next) {
    var fecha = new Date(req.body.fecha);
    var dniMedico = req.body.dniMedico;
    let arrayTurnos = [];

    //Creo todos los turnos de 9 a 18 en el dia dado.
    let hour = 9;
    let minute = 0;
    for (let index = 0; index < 18; index++) {
        var fechaTurno = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), hour, minute);
        var Turno = {
            userID: "",
            razon: "",
            fecha: fechaTurno,
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
        let createdTurnos = [];
        for (let index = 0; index < arrayTurnos.length; index++) {
            createdTurnos.push(await TurnoService.createTurno(arrayTurnos[index]));
        }
        return res.status(201).json({createdTurno: createdTurnos, message: "Turnos creados correctamente"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "TurnosController dice: Error en la cracion de turnos"})
    }
}

exports.cancelarTurno = async function (req, res, next) {
    var Turno = {
        id: req.body.id,
        userID: "",
        razon: "",
        fecha: req.body.fecha,
        dniMedico: req.body.dniMedico,
        estado: "disponible"
    }
    try {
        var createdTurno = await TurnoService.actualizarTurno(Turno)
        return res.status(201).json({createdTurno, message: "Turno Actualizado Correctamente"})
    } catch (e) {
        console.log(e)
        return res.status(400).json({status: 400, message: "Error en la actualizacion del turno"})
    }
}

exports.getTurnosDisponiblesByMedico = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 20;
    let filtro= {dniMedico: req.body.dniMedico}
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