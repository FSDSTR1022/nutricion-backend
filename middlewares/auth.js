const jwt = require('jsonwebtoken');

const auth = {
	check: (req, res, next) => {
		const token = req.headers?.token;

		if (!token) {
			return res.status(400).json({
				succes: false,
				message: 'Token incorrecto',
				token: null,
			});
		}

		jwt.verify(token, process.env.MY_PLAIN_TEXT_PASSWORD, (error, decoded) => {
			if (error) {
				return res.status(400).json({
					succes: false,
					message: 'Error al validar Token',
					token: null,
				});
			}

			req.userEmail = decoded.userEmail;
			req.userId = decoded.userId;

			next();
		});
	},
};
