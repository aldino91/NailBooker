import { ErrorSentEmail } from '../../../../errors/emails/ErrorSendEmails';
import { formatDate } from '../../../../utils/formateDate';
import EmailService from './EmailService';
import { optionsEmails } from './optionsEmail';
import { htmlBooking } from './templateHtml/BookingEmail';

const sendEmailBooking = async (
	emailService: EmailService,
	email: string,
	date: string,
	time: string
): Promise<boolean> => {
	try {
		const templateEmail = htmlBooking(date, time);

		const options = optionsEmails({
			to: email,
			subject: 'Conferma Prenotazione',
			htmlBody: templateEmail,
		});

		const isSent = await emailService.sendEmail(options);

		if (!isSent) throw new ErrorSentEmail('Error sent email validated');

		return true;
	} catch (error) {
		return false;
	}
};

export default sendEmailBooking;
