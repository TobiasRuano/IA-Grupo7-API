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

exports.createTurnos = async function (arrayTurnos) {

    for (i = 0; i < arrayTurnos.length; i++) { 
        var hashedID = bcrypt.hashSync(turno.id, 8);
        var newTurno = new Turno({
            id: hashedID,
            userID: arrayTurnos[i].userID,
            razon: arrayTurnos[i].razon,
            fecha: arrayTurnos[i].fecha,
            dniMedico: arrayTurnos[i].dniMedico,
            estado: arrayTurnos[i].estado
        })

        try {
            // Saving the Turno 
            var savedTurno = await newTurno.save();
            return true;
        } catch (e) {
            // return a Error message describing the reason 
            console.log(e)    
            throw Error("Error al crear el Turno")
        }
    }
}

exports.deleteTurno = async function (id) {

    // Delete the User
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