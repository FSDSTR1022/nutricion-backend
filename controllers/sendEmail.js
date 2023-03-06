const SibApiV3Sdk = require('sib-api-v3-sdk');

const api =
	'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';

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = api;

const sendEmail = patient => {
	new SibApiV3Sdk.TransactionalEmailsApi()
		.sendTransacEmail({
			subject: 'Bienvenid@a Nutrición Pro!',
			sender: { email: 'nutricionpropro@gmail.com', name: 'Nutrición Pro' },
			replyTo: { email: 'nutricionpropro@gmail.com', name: 'Nutrición Pro' },
			to: [{ name: patient.name, email: patient.email }],
			htmlContent:
				'<!DOCTYPE html> <> <body> <h1>Bienvenid@ a Nutrición Pro</h1> <h3>Hola {{params.bodyName}},</h3> <p>Nos alegramos que hayas decidido coger las riendas de tu cuerpo. </p><p>Te damos la bienvenida y te aconsejamos que te pases por nuestra sección <b>Getting Started</b></p><p>Estos son tus datos de usuario</p><p>usuario: {{ params.bodyEmail}} </p><p>password: {{params.bodyPass}}</p><p>Suerte y Fuerza</p><p>El equipo de Nutrición Pro</p> </body>',

			params: {
				bodyName: patient.name,
				bodyEmail: patient.email,
				bodyPass: patient.password,
			},
		})
		.then(
			function (data) {
				console.log(data);
			},
			function (error) {
				console.error(error);
			}
		);
};
module.exports = sendEmail;
