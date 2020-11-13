// Gettign the Newly created Mongoose Model we just created 
var HistoriaClinica = require('../models/HistoriaClinica.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getHistoriaClinica = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var HistoriaClinica = await HistoriaClinica.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return HistoriaClinica;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating HistoriaClinica');
    }
}

exports.createHistoriaClinica = async function (historiaclinica) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedIdr = bcrypt.hashSync(historiaclinica.id, 8);
    
    var newHistoriaClinica = new HistoriaClinica({
        motivo: historiaclinica.motivo,
        gruposang: historiaclinica.gruposang,
        cardiaco: historiaclinica.cardiaco,
        diabetes: historiaclinica.diabetes,
        hiperten: historiaclinica.hiperten,
        alergias: historiaclinica.alergias,
        antecendentes: historiaclinica.antecedentes,
        evolucion: historiaclinica.evolucion,
        dnipaciente: historiaclinica.dnipaciente,
    })

    try {
        // Saving the User 
        var savedHistoriaClinica = await newHistoriaClinica.save();
        var token = jwt.sign({
            id: savedHistoriaClinica._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating HistoriaClinica")
    }
}

exports.deleteHistoriaClinica = async function (id) {

    // Delete the HistoriaClinica
    try {
        var deleted = await HistoriaClinica.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("HistoriaClinica Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the HistoriaClinica")
    }
}
