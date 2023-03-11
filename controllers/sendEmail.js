const SibApiV3Sdk = require('sib-api-v3-sdk');

const api =
	'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';

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = api;

const sendEmail = patient => {+
	if (patient.userType != 'profesional') {
			new SibApiV3Sdk.TransactionalEmailsApi()
				.sendTransacEmail({
					subject: 'Bienvenid@a Nutrición Pro!',
					sender: { email: 'nutricionpropro@gmail.com', name: 'Nutrición Pro' },
					templateId:1,
					replyTo: { email: 'nutricionpropro@gmail.com', name: 'Nutrición Pro' },
					to: [{ name: patient.name, email: patient.email }],
					
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
			} else {
			new SibApiV3Sdk.TransactionalEmailsApi()
				.sendTransacEmail({
					subject: 'Bienvenid@a Nutrición Pro!',
					sender: { email: 'nutricionpropro@gmail.com', name: 'Nutrición Pro' },
					templateId:3,
					replyTo: { email: 'nutricionpropro@gmail.com', name: 'Nutrición Pro' },
					to: [{ name: patient.name, email: patient.email }],
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

	}			
};
module.exports = sendEmail;
