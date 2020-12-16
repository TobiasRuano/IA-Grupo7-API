var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var TurnoSchema = new mongoose.Schema({
    id: String,
    razon: String,
    fecha: Date,
    dniMedico: Number,
    medico: String,
    estado: String,
    userID: Number
})

TurnoSchema.plugin(mongoosePaginate)
const Turno = mongoose.model('Turno', TurnoSchema)

module.exports = Turno;