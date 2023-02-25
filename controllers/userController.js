/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const UserModel = require('../models/userModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async function (req,res) {
	console.log("En getAllUsers")
	try {
        const user = await UserModel.find()
         res.status(200).json(user);        
    } catch (error) {
         res.status(400).json("ERORR: "+error); 
    } 
}
 
const getUserbyID = async function (req, res, next) {
	console.log("En getUserbyID")
	try {
		const { id } = req.params;
		const user = await UserModel.findById(id);
		res.status(200).json(user);
		
	} catch (error) {
		res.status(400).json("ERORR: "+error);		
	}
	
};

const createUser = async function (req, res) {
	console.log("En createUser")
	try {
		let { email, password } = req.body;

		// Comprobamos que el usuario no existe
		const searchUser = await UserModel.find({ email });

		// En el caso de que exista retornamos error
		if (searchUser.length) {
			return res.status(400).json({
				succes: false,
				message: 'Usuario ya existente',
			});
		}

		// Ciframos contraseña
		const a = bcrypt.hash(password, saltRounds, function (error, hash) {
			if (error) {
				return res.status(400).json({
					succes: false,
					message: 'Se ha producido un error al ejecutar bcrypt.hash()',
				});
			} else {
				console.log('hash: ', hash);
				const newUser = new UserModel();

				newUser.email = req.body.email;
				newUser.password = hash;
				newUser.userType = req.body.userType;
				newUser.professional = req.body.professional;
				newUser.name = req.body.name;
				newUser.lastName = req.body.lastName;
				newUser.dni = req.body.dni;
				newUser.phone = req.body.phone;
				newUser.isActive = req.body.isActive;
				newUser.imgUrl = req.body.imgUrl;

				newUser.save((err, savedInfo) => {
					if (err) {
						return res.status(400).json({
							succes: false,
							error: err,
							message: 'No se pudo guardar el Usuario',
						});
					} else {
						res.status(200).json(savedInfo);
					}
				});
			}
		});
	} catch (error) {
		res.status(400).json('ERROR: ' + error);
	}
};

const updateUser = async function (req, res) {
	console.log("En updateUser")
	try {

		let userToSave = req.body
		if(req.body.password){
			await bcrypt.hash(req.body.password, saltRounds)
			.then((hash)=>{				
				userToSave.password=hash
			})
			.catch((error)=>{
				return res.status(400).json({
					succes: false,
					message: 'Se ha producido un error al ejecutar bcrypt.hash()',
				});
			})			
		}
		
		await UserModel.findByIdAndUpdate(req.params.id, userToSave)		
		const modifiedUser = await UserModel.findById(req.params.id);
		res.status(200).json(modifiedUser)
	}
	catch (err) {
		res.status(400).send("Error"+err)
	}
}

const getUsersByProfessional = async function(req, res){
	console.log("en getUsersByProfessional")
	try {

		const users = await UserModel.find({professional: req.params.id});
		res.status(200).json(users);
		
	} catch (error) {
		res.status(400).json("ERORR: "+error);		
	}
}


const loginUser = async function (req, res, next) {
	console.log("Entro al loginUser")
	const { email, password } = req.body;
	const searchUsers = await UserModel.findOne({ email });

	if (!searchUsers) {
		return res.status(400).json({
			succes: false,
			message: 'Usuario no encontrado',
			token: null,
		});
	}

	// Comparamos contraseñas para verificar la info
	bcrypt.compare(password, searchUsers.password, function (error, response) {
		if (error)
			return res.status(400).json({
				succes: false,
				message: 'Se ha producido un error al ejecutar bcrypt.compare()',
				token: null,
			});

		if (!response)
			return res.status(200).json({
				succes: false,
				message: 'Se ha producido un error al validar contraseña',
				token: null,
			});

		// El token expirará en 1h.
		const token = jwt.sign(
			{ userEmail: email, userId: searchUsers._id },
			process.env.MY_PLAIN_TEXT_PASSWORD,
			{
				expiresIn: '1h',
			}
		);

		return res.status(200).json({
			succes: true,
			message: 'Iniciando sesión con éxito',
			token: token,
		});
	});
};



/* 
const getProfessionalById = async function (req, res, next) {
	const { id } = req.params;
	const professional = await UserModel.findById(id);
	res.json({ professional });
};

// PUT PROFESSIONAL
const putProfessional = async function (req, res, next) {
	try {
		await UserModel.findByIdAndUpdate(req.userId, {
			dni: req.body.dni,
			name: req.body.name,
			discipline: req.body.discipline,
			admissionDate: req.body.admissionDate,
			dropoutDate: req.body.dropoutDate,
			email: req.body.email,
			phone: req.body.phone,
			user: req.body.user,
			password: req.body.password,
			active: req.body.active,
			imgUrl: req.body.imgUrl,
		});
		res.send('Professional Updated!');
	} catch (err) {
		res.send(400).send('Server Error');
	}
};

// DELETE PROFESSIONAL
const deleteProfessional = async function (req, res, next) {
	try {
		await UserModel.findByIdAndDelete(req.params.id);
		res.json('Professional deleted!');
	} catch (err) {
		res.send(400).send('Server Error');
	}
};



// REGISTER PROFESIONAL
const registerprofesional = async function (req, res) {
	try {
		let { email, password } = req.body;

		// Comprobamos que el usuario no existe
		const searchUser = await UserModel.find({ email });

		// En el caso de que exista retornamos error
		if (searchUser.length) {
			return res.status(400).json({
				succes: false,
				message: 'Usuario ya existente',
			});
		}

		// Ciframos contraseña
		bcrypt.hash(password, saltRounds, function (error, hash) {
			if (error) {
				return res.json({
					succes: false,
					message: 'Se ha producido un error al ejecutar bcrypt.hash()',
				});
			}

			// Creación del newUser y asignar variables
			const newProfessional = new UserModel();

			newProfessional.dni = req.body.dni;
			newProfessional.name = req.body.name;
			newProfessional.discipline = req.body.discipline;
			newProfessional.admissionDate = req.body.admissionDate;
			newProfessional.dropoutDate = req.body.dropoutDate;
			newProfessional.email = req.body.email;
			newProfessional.phone = req.body.phone;
			newProfessional.user = req.body.user;
			newProfessional.password = hash; // contraseña hash
			newProfessional.active = req.body.active;
			newProfessional.imgUrl = req.body.imgUrl;

			// Guardamos el usuario
			newProfessional.save((err, savedInfo) => {
				if (err) {
					return res.status(400).json({
						succes: false,
						message:
							'Se ha producido un error al ejecutar newProfessional.save()',
						newProfessional: newProfessional,
					});
				}

				return res.json({ professional: savedInfo });
			});
		});
	} catch (err) {
		res.send(400).send('Server Error');
	}
};
 */
module.exports = {
	getAllUsers,
	createUser,
	getUserbyID,
	updateUser,
	getUsersByProfessional,
	loginUser
	/* ,
	getProfessionalById,
	createProfessional,
	putProfessional,
	deleteProfessional,
	loginProfesional,
	registerprofesional, */
};
