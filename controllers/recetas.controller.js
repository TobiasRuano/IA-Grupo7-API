var RecetaService = require('../services/receta.service');
const Formidable = require('formidable')
const bluebird = require('bluebird')
var fs = require('fs');
var fs = bluebird.promisifyAll(require('fs'))
var {join} = require('path');

// Saving the context of this module inside the _the variable
_this = this;

// Returns true if successful or false otherwise
async function checkCreateUploadsFolder (uploadsFolder) {
    try 
    {
		await fs.statAsync(uploadsFolder)
    } 
    catch (e) 
    {
        if (e && e.code == 'ENOENT') 
        {
			console.log('The uploads folder doesn\'t exist, creating a new one...')
            try 
            {
				await fs.mkdirAsync(uploadsFolder)
            } 
            catch (err) 
            {
				console.log('Error creating the uploads folder 1')
				return false
			}
        } 
        else 
        {
			console.log('Error creating the uploads folder 2')
			return false
		}
	}
	return true
}

// Returns true or false depending on whether the file is an accepted type
function checkAcceptedExtensions (file) 
{
	const type = file.type.split('/').pop()
	const accepted = ['jpeg', 'jpg', 'png', 'gif', 'pdf','webp']
	if (accepted.indexOf(type) == -1) {
		return false
	}
	return true
}


// Async Controller function to get the To do List
exports.getRecetasByID = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = {userID: req.body.userID}
    console.log(filtro)
    try {
        var Recetas = await RecetaService.getRecetas(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Recetas, message: "Succesfully Recetas Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createReceta= async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller, ha crear una Receta",req.body)
    var Receta = {
        
        id: req.body.id,
        fecha: req.body.fecha,
        nombreMedico: req.body.nombreMedico,
        comentario: req.body.comentario,
        userID: req.body.userID,
        imagenReceta:req.body.imagenReceta
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdReceta= await RecetaService.createReceta(Receta)
        return res.status(201).json({createdReceta, message: "Succesfully Created Receta"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Receta Creation was Unsuccesfull"})
    }
}

exports.removeReceta = async function (req, res, next) {

    var id = req.params.id;
    try {
        var deleted = await RecetaService.deleteReceta(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

//transfiere archivo de la maquina de usuario al servidor
exports.uploadFiles = async function (req, res, next) {
    //console.log("req",req.body);
    let form = Formidable.IncomingForm()
    //console.log("form",form);
    const uploadsFolder = process.env.UPLOAD_DIR
    //console.log("uploadFolder",uploadsFolder);
	form.multiples = true
	form.uploadDir = uploadsFolder
	form.maxFileSize = 50 * 1024 * 1024 // 50 MB
	const folderCreationResult = await checkCreateUploadsFolder(uploadsFolder)
	if (!folderCreationResult) {
		return res.json({ok: false, msg: "The uploads folder couldn't be created"})
	}
	form.parse(req, async (err, fields, files) => {
		let myUploadedFiles = []
		if (err) {
			console.log('Error parsing the incoming form',err)
			return res.json({ok: false, msg: 'Error passing the incoming form'})
		}
		// If we are sending only one file:
		if (!files.files.length) {
			const file = files.files
			if (!checkAcceptedExtensions(file)) {
				console.log('The received file is not a valid type')
				return res.json({ok: false, msg: 'The sent file is not a valid type'})
			}
			const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
			myUploadedFiles.push(fileName)
			try {
				await fs.renameAsync(file.path, join(uploadsFolder, fileName))
			} catch (e) {
				console.log('Error uploading the file')
				try { await fs.unlinkAsync(file.path) } catch (e) {}
				return res.json({ok: false, msg: 'Error uploading the file'})
			}
		} else {
			for(let i = 0; i < files.files.length; i++) {
				const file = files.files[i]
				if (!checkAcceptedExtensions(file)) {
					console.log('The received file is not a valid type')
					return res.json({ok: false, msg: 'The sent file is not a valid type'})
				}
				const fileName = encodeURIComponent(file.name.replace(/&. *;+/g, '-'))
				myUploadedFiles.push(fileName)
				try {
					await fs.renameAsync(file.path, join(uploadsFolder, fileName))
				} catch (e) {
					console.log('Error uploading the file')
					try { await fs.unlinkAsync(file.path) } catch (e) {}
					return res.json({ok: false, msg: 'Error uploading the file'})
				}
			}
		}
		res.json({ok: true, msg: 'Files uploaded succesfully!', files: myUploadedFiles})
	})
}

//descargar archivo de la pagina

exports.downloadFiles= async function(req,res,next){
	
}
