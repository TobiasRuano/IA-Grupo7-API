var HistoriaClinicaService = require('../services/historiaclinica.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getHistoriaClinicasByID = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = {dnipaciente: req.body.dnipaciente}
    console.log(filtro)
    try { 
        var HistoriaClinica = await HistoriaClinicaService.getHistoriaClinica(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: HistoriaClinica, message: "HistoriaClinica Recibida con exito"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createHistoriaClinica = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller, a crear una HistoriaClinica",req.body)
    var HistoriaClinica = {
        id: req.body.id,
        motivo: req.body.motivo,
        gruposang: req.body.gruposang,
        cardiaco: req.body.cardiaco,
        diabetes: req.body.diabetes,
        hiperten: req.body.hiperten,
        alergias: req.body.alergias,
        antecendentes: req.body.antecendentes,
        evolucion: req.body.evolucion,
        dnipaciente: req.body.dnipaciente
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdHistoriaClinica= await HistoriaClinicaService.createHistoriaClinica(HistoriaClinica)
        return res.status(201).json({createdHistoriaClinica, message: "Se creó la HistoriaClinica con exito"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Error al crear la HistoriaClinica"})
    }
}

exports.removeHistoriaClinica = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await HistoriaClinicaService.deleteHistoriaClinica(id);
        res.status(200).send("HistoriaClinica Borrada! ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}
