import { envs } from '../../../../config/envs';
import { ErrorSentEmail } from '../../../../errors/emails/ErrorSendEmails';
import EmailService from './EmailService';
import { optionsEmails } from './optionsEmail';
import { htmlForgotPassword } from './templateHtml/ForgotPassword';

const sendEmailForgotPassword = async (
	emailService: EmailService,
	email: string,
	id: string
): Promise<boolean> => {
	try {
		const link = `${envs.WEBCLIENT_URL}/reset-password/${id}`;

		const templateEmail = htmlForgotPassword(link);

		const options = optionsEmails({
			to: email,
			subject: 'Forgot Email',
			htmlBody: templateEmail,
		});

		const isSent = await emailService.sendEmail(options);

		if (!isSent) throw new ErrorSentEmail('Error sent email validated');

		return true;
	} catch (error) {
		return false;
	}
};

export default sendEmailForgotPassword;
