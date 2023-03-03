const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async function (req, res) {
	try {
		const user = await UserModel.find();
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json('ERORR: ' + error);
	}
};

const getUserbyID = async function (req, res) {
	try {
		const { id } = req.params;
		const user = await UserModel.findById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(400).json('ERORR: ' + error);
	}
};

const createUser = async function (req, res) {
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
				return res.status(400).json({
					succes: false,
					message: 'Se ha producido un error al ejecutar bcrypt.hash()',
				});
			} else {
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
	try {
		let userToSave = req.body;
		if (req.body.password) {
			await bcrypt
				.hash(req.body.password, saltRounds)
				.then(hash => {
					userToSave.password = hash;
				})
				.catch(err => {
					return res.status(400).json({
						succes: false,
						message: 'Se ha producido un error al ejecutar bcrypt.hash()',
						error: err,
					});
				});
		}

		await UserModel.findByIdAndUpdate(req.params.id, userToSave);
		const modifiedUser = await UserModel.findById(req.params.id);
		res.status(200).json(modifiedUser);
	} catch (err) {
		res.status(400).send('Error' + err);
	}
};

const getUsersByProfessional = async function (req, res) {
	try {
		const users = await UserModel.find({ professional: req.params.id });
		res.status(200).json(users);
	} catch (error) {
		res.status(400).json('ERORR: ' + error);
	}
};

const loginUser = async function (req, res) {
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
			return res.status(400).json({
				succes: false,
				message: 'Se ha producido un error al validar contraseña',
				token: null,
			});

		// El token expirará en 1h.
		const token = jwt.sign(
			{ userEmail: email, userId: searchUsers._id },
			// eslint-disable-next-line no-undef
			process.env.MY_PLAIN_TEXT_PASSWORD,
			{
				expiresIn: '1h',
			}
		);

		return res.status(200).json({
			succes: true,
			message: 'Iniciando sesión con éxito',
			user: {
				name: searchUsers.name,
				email: searchUsers.email,
				type: searchUsers.userType,
				img: searchUsers.imgUrl,
				token: token,
			},
		});
	});
};

module.exports = {
	getAllUsers,
	createUser,
	getUserbyID,
	updateUser,
	getUsersByProfessional,
	loginUser,
};
