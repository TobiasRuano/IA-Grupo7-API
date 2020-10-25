// Gettign the Newly created Mongoose Model we just created 
var Receta = require('../models/Receta.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getRecetas = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query",query)
        var Recetas = await Receta.paginate(query, options)
        // Return the Userd list that was retured by the mongoose promise
        return Recetas;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Recetas');
    }
}

exports.createReceta = async function (receta) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedIdr = bcrypt.hashSync(receta.id, 8);
    
    var newReceta = new Receta({

        id: hashedIdr,
        fecha: new Date(),
        nombreMedico: receta.nombreMedico,
        comentario: receta.comentario,
        userID: receta.userID
        //imagenReceta:receta.imagenReceta

    })

    try {
        // Saving the User 
        var savedReceta = await newReceta.save();
        var token = jwt.sign({
            id: savedReceta._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Receta")
    }
}

exports.deleteReceta = async function (id) {

    // Delete the Receta
    try {
        var deleted = await Receta.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Receta")
    }
}


// exports.updateUser = async function (user) {
    
//     var id = {name :user.name}

//     try {
//         //Find the old User Object by the Id
//         var oldUser = await User.findOne(id);
//     } catch (e) {
//         throw Error("Error occured while Finding the User")
//     }
//     // If no old User Object exists return false
//     if (!oldUser) {
//         return false;
//     }
//     //Edit the User Object
//     var hashedPassword = bcrypt.hashSync(user.password, 8);
//     oldUser.name = user.name
//     oldUser.email = user.email
//     oldUser.password = hashedPassword
//     try {
//         var savedUser = await oldUser.save()
//         return savedUser;
//     } catch (e) {
//         throw Error("And Error occured while updating the User");
//     }
// } // esto es de user hay que modificarlo para receta