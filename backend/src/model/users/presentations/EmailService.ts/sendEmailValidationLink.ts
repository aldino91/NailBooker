import { envs } from '../../../../config/envs';
import { JwtAdapter } from '../../../../config/jwt.adapter';
import { ErrorSentEmail } from '../../../../errors/emails/ErrorSendEmails';
import { ErrorInternalServer } from '../../../../errors/error.internal.server';
import EmailService from './EmailService';
import { optionsEmails } from './optionsEmail';
import { htmalValidateEmail } from './templateHtml/ValidateEmail';

const sendEmailValidationLink = async (
	emailService: EmailService,
	email: string
): Promise<boolean> => {
	try {
		const token = await JwtAdapter.generateToken({ email }, '10m');

		if (!token) throw new ErrorInternalServer('Error generated token!');

		const link = `${envs.WEBSERVICE_URL}/api/auth/validate-email/${token}`;

		const templateEmail = htmalValidateEmail(email, link);

		const options = optionsEmails({
			to: email,
			subject: 'Validate Email',
			htmlBody: templateEmail,
		});

		const isSent = await emailService.sendEmail(options);

		if (!isSent) throw new ErrorSentEmail('Error sent email validated');

		return true;
	} catch (error) {
		return false;
	}
};

export default sendEmailValidationLink;
