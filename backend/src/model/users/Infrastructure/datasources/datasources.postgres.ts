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
			throw new UserNotFoundError('The user already exists!');
		}
		const passwordHash = BcryptAdapter.hash(password);

		const sendEmail = await sendEmailValidationLink(this.emailService, email);

		if (sendEmail === false)
			throw new ErrorSentEmail('Error for sent validation email!');

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
				error: new ErrorInternalServer('Error internal server-created user'),
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
			throw new ErrorUserEmailOrPassword('Email or password is not exist!');

		const isMatching = BcryptAdapter.compare(
			loginUserDto.password,
			user.password
		);

		if (!isMatching)
			throw new ErrorUserEmailOrPassword('Email or Password is not valid!');

		const token = await JwtAdapter.generateToken(
			{
				id: user.id,
				email: user.email,
			},
			'2592000'
		);

		if (!token || typeof token !== 'string')
			throw new ErrorTokenUser('Error when generating token!');

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
}
