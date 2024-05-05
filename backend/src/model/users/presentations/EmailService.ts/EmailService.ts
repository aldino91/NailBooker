import nodemailer from 'nodemailer';

interface SendMailOptions {
	to: string | string[];
	subject: string;
	htmlBody: string;
	attachements?: Attachement[];
}

interface Attachement {
	filename: string;
	path: string;
}

export default class EmailService {
	constructor(
		public MAILER_SERVICE: string,
		public MAILER_MAIL: string,
		public MAILER_SECRET_KEY: string
	) {}
	private transporter = nodemailer.createTransport({
		service: this.MAILER_SERVICE,
		auth: {
			user: this.MAILER_MAIL,
			pass: this.MAILER_SECRET_KEY,
		},
	});

	async sendEmail(options: SendMailOptions): Promise<boolean> {
		const { htmlBody, subject, to, attachements = [] } = options;

		try {
			await this.transporter.sendMail({
				to,
				subject,
				html: htmlBody,
				attachments: attachements,
			});

			return true;
		} catch (error) {
			return false;
		}
	}
}
