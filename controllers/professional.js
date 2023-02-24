/* eslint-disable no-unused-vars */
const ProfessionalModel = require('../models/professional')

// GET PROFESSIONALS
const getAllProfessionals = async function (req, res, next) {
	const professional = await ProfessionalModel.find().populate('discipline');
	res.json({ professional });
};

// GET PROFESSIONAL BY ID
const getProfessionalById = async function (req, res, next) {
	const { id } = req.params;
	const professional = await ProfessionalModel.findById(id);
	res.json({ professional });
};

// POST PROFESSIONAL
const createProfessional = async function (req, res, next) {
	const newProfessional = new ProfessionalModel();

	newProfessional.dni = req.body.dni;
	newProfessional.name = req.body.name;
	newProfessional.discipline = req.body.discipline;
	newProfessional.admissionDate = req.body.admissionDate;
	newProfessional.dropoutDate = req.body.dropoutDate;
	newProfessional.email = req.body.email;
	newProfessional.phone = req.body.phone;
	newProfessional.user = req.body.user;
	newProfessional.password = req.body.password;
	newProfessional.active = req.body.active;
	newProfessional.imgUrl = req.body.imgUrl;

	newProfessional.save((err, savedInfo) => {
		if (err) {
			return res.status(400).json({ error: err });
		}
		return res.json({ professional: savedInfo });
	});
};

// PUT PROFESSIONAL
const putProfessional = async function (req, res, next) {
	try {
		await ProfessionalModel.findByIdAndUpdate(req.userId, {
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
		await ProfessionalModel.findByIdAndDelete(req.params.id);
		res.json('Professional deleted!');
	} catch (err) {
		res.send(400).send('Server Error');
	}
};

// LOGIN PROFESIONAL
const loginProfesional = async function (req, res, next) {
	const { email, password } = req.body;
	const searchUsers = await ProfessionalModel.findOne({ email });

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

		return res.json({
			succes: true,
			message: 'Iniciando sesión con éxito',
			token: token,
		});
	});
};

// REGISTER PROFESIONAL
const registerprofesional = async function (req, res) {
	try {
		let { email, password } = req.body;

		// Comprobamos que el usuario no existe
		const searchUser = await ProfessionalModel.find({ email });

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
			const newProfessional = new ProfessionalModel();

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

module.exports = {
	getAllProfessionals,
	getProfessionalById,
	createProfessional,
	putProfessional,
	deleteProfessional,
	loginProfesional,
	registerprofesional,
};
