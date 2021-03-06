// Gettign the Newly created Mongoose Model we just created 
var Turno = require('../models/Turno.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { attempt } = require('bluebird');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getTurnos = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Turnos = await Turno.paginate(query, options)
        // Return the Turnos list that was retured by the mongoose promise
        return Turnos;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Turnos');
    }
}

exports.createTurno = async function (turno) {

    var newTurno = new Turno({
        id: bcrypt.hashSync(turno.dniMedico, 16),
        userID: turno.userID,
        razon: turno.razon,
        fecha: turno.fecha,
        medico: turno.medico,
        dniMedico: turno.dniMedico,
        estado: turno.estado
    })

    try {
        var savedTurno = await newTurno.save();
        return true;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error("Error al crear el Turno")
    }
}

exports.actualizarTurno = async function (turno) {
    var id = {id :turno.id}
    console.log("Esto es ID: ", id);

    try {
        var oldTurno = await Turno.findOne(id);
    } catch (e) {
        throw Error("Error al intentar encontrar el turno")
    }
    if (oldTurno == null) {
        console.log("esto es lo que devuelve oldTurno: ", oldTurno);
        return false;
    }
    oldTurno.id = turno.id
    oldTurno.razon = turno.razon
    oldTurno.fecha = turno.fecha
    oldTurno.medico = turno.medico
    oldTurno.dniMedico = turno.dniMedico
    oldTurno.estado = turno.estado
    oldTurno.userID = turno.userID
    try {
        var savedTurno = await oldTurno.save()
        return savedTurno;
    } catch (e) {
        throw Error("Error al intentar guardar el nuevo turno");
    }
}

exports.deleteTurno = async function (id) {
    try {
        var deleted = await Turno.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Turno Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Turno")
    }
}