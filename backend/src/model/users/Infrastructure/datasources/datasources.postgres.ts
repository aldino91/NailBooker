import { BcryptAdapter } from '../../../../config/bcrypt.adapter';
import { JwtAdapter } from '../../../../config/jwt.adapter';
import { ErrorSentEmail } from '../../../../errors/emails/ErrorSendEmails';
import { ErrorInternalServer } from '../../../../errors/error.internal.server';
import { ErrorUserEmailOrPassword } from '../../../../errors/users/user.not.existed.error';
import { UserNotFoundError } from '../../../../errors/users/user.not.found.error';
import { ErrorTokenUser } from '../../../../errors/users/user.token.error';
import prisma from '../../../../postgres';
import { UserDataSources } from '../../domain/datasources.users';
import { LoginUserDto } from '../../domain/dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../../domain/dtos/auth/dtos.register.user';
import IntReturnLoginUser from '../../interface/intReturnLoginUser';
import IntReturnRegisterUser from '../../interface/interfReturnfetch';
import EmailService from '../../presentations/EmailService.ts/EmailService';
import sendEmailForgotPassword from '../../presentations/EmailService.ts/sendEmailForgotPassoword';
import sendEmailValidationLink from '../../presentations/EmailService.ts/sendEmailValidationLink';

export class UserDataSourcesPostgresImpl implements UserDataSources {
	constructor(public readonly emailService: EmailService) {}
	async register(
		registerUserDto: RegisterUserDto
	): Promise<IntReturnRegisterUser> {
		const {
			name,
			surname,
			email,
			emailValidated,
			password,
			phoneNumber,
			role,
		} = registerUserDto;

		const ExistedUser = await prisma.users.findFirst({
			where: {
				email,
			},
		});

		if (ExistedUser) {
			return {
				error: new UserNotFoundError('The user already exists!').descriptions,
			};
		}
		const passwordHash = BcryptAdapter.hash(password);

		const sendEmail = await sendEmailValidationLink(this.emailService, email);

		if (sendEmail === false)
			return {
				error: new ErrorSentEmail('Error for sent validation email!')
					.descriptions,
			};

		try {
			const user = await prisma.users.create({
				data: {
					name,
					surname,
					email,
					emailValidated,
					phoneNumber,
					password: passwordHash,
					role,
				},
			});
			return { error: undefined, user };
		} catch (error) {
			return {
				error: new ErrorInternalServer('Error internal server-created user')
					.descriptions,
				user: undefined,
			};
		}
	}

	async login(loginUserDto: LoginUserDto): Promise<IntReturnLoginUser> {
		const user = await prisma.users.findFirst({
			where: {
				email: loginUserDto.email,
			},
		});

		if (!user)
			return {
				error: new ErrorUserEmailOrPassword('Email or password is not exist!')
					.descriptions,
			};

		const isMatching = BcryptAdapter.compare(
			loginUserDto.password,
			user.password
		);

		if (!isMatching)
			return {
				error: new ErrorUserEmailOrPassword('Email or Password is not valid!')
					.descriptions,
			};

		const token = await JwtAdapter.generateToken(
			{
				id: user.id,
				email: user.email,
				role: user.role,
			},
			'86400000'
		);

		if (!token || typeof token !== 'string')
			return {
				error: new ErrorTokenUser('Error when generating token!').descriptions,
			};

		return { error: undefined, user, token: token };
	}

	async validateEmail(token: string): Promise<any> {
		try {
			const payload = await JwtAdapter.validateToken(token);

			if (!payload) return { error: new ErrorTokenUser('Invalid Token!') };

			const { email } = payload as { email: string };

			if (!email) return { error: new ErrorTokenUser('Error not in token!') };

			const user = await prisma.users.findFirst({ where: { email: email } });

			if (!user) return { error: new ErrorTokenUser('User not existed!') };

			user.emailValidated = true;

			await prisma.users.update({ where: { id: user.id }, data: user });

			return { data: 'Email Validated' };
		} catch (error) {
			return {
				error: new ErrorTokenUser('Error validated token!'),
				data: 'Error validated token!',
			};
		}
	}

	async forgotPassword(
		email: string
	): Promise<{ data?: string; status: string }> {
		const user = await prisma.users.findFirst({
			where: {
				email: email,
			},
		});

		if (!user)
			return {
				data: 'Email non trovato nel nostro database...',
				status: 'warn',
			};

		try {
			const sendEmail = await sendEmailForgotPassword(
				this.emailService,
				email,
				user.id
			);

			if (sendEmail === false)
				return {
					data: `Non é andato a buon fine l'invio dell'email a: ${email}, provi piú tardi. Grazie.`,
					status: 'warn',
				};

			return {
				data: `Abbiamo inviato un'email all'indirizzo ${email} contenente le istruzioni per reimpostare la tua password. Ti preghiamo di controllare la tua casella di posta elettronica e di seguire le indicazioni fornite.`,
				status: 'success',
			};
		} catch (error) {
			console.error('Error: ', error);

			return {
				data: `Stiamo avendo problemi con il server, per favore provi piú tardi. Grazie.`,
				status: 'error',
			};
		}
	}

	async resetPassword(id: string, confirm: string): Promise<{ data?: string }> {
		try {
			const user = await prisma.users.findFirst({
				where: {
					id,
				},
			});

			if (!user)
				return {
					data: 'Questo utente non é registrato nella nostra plattaforma...',
				};

			const passwordHash = BcryptAdapter.hash(confirm);

			await prisma.users.update({
				where: {
					id,
				},
				data: {
					password: passwordHash,
				},
			});

			return { data: 'Password aggiornata con successo... ' };
		} catch (error) {
			console.log('Error: ', error);
			return {
				data: 'Non é stato possibile aggiornare la password, prova piú tardi. Grazie',
			};
		}
	}
}
