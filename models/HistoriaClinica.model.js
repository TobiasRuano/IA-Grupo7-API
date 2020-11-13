var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var HistoriaClinicaSchema = new mongoose.Schema({
    id: String,
    motivo: String,
    gruposang: String,
    cardiaco: String, 
    diabetes: String,
    hiperten: String,
    alergias: String,
    antecendentes: String,
    evolucion: String,
    dnipaciente: String
})

HistoriaClinicaSchema.plugin(mongoosePaginate)
const HistoriaClinica = mongoose.model('HistoriaClinica', HistoriaClinicaSchema)

module.exports = HistoriaClinica;