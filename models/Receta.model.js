var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var RecetaSchema = new mongoose.Schema({
    id: String,
    fecha: Date,
    nombreMedico:String,
    comentario: String
    //imagen: de la receta
})

RecetaSchema.plugin(mongoosePaginate)
const Receta = mongoose.model('Receta', RecetaSchema)

module.exports = Receta;