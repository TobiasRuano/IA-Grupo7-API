var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    dni: Number,
    name: String,
    surname: String,
    sexo: String,
    fechaNac: Date,
    email: String,
    domicilio: String,
    telefono: Number,
    password: String,
    permiso: Number
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;