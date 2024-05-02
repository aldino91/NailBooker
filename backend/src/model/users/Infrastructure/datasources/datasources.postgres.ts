import { BcryptAdapter } from '../../../../config/bcrypt.adapter';
import { JwtAdapter } from '../../../../config/jwt.adapter';
import { ErrorInternalServer } from '../../../../errors/error.internal.server';
import { ErrorUserEmailOrPassword } from '../../../../errors/users/user.not.existed.error';
import { UserNotFoundError } from '../../../../errors/users/user.not.found.error';
import { ErrorTokenUser } from '../../../../errors/users/user.token.error';
import prisma from '../../data/postgres';
import { UserDataSources } from '../../domain/datasources.users';
import { LoginUserDto } from '../../domain/dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../../domain/dtos/auth/dtos.register.user';
import InterfaceReturnUser from '../../interface/interfReturnfetch';

export class UserDataSourcesPostgresImpl implements UserDataSources {
	async register(
		registerUserDto: RegisterUserDto
	): Promise<InterfaceReturnUser> {
		const {
			name,
			surname,
			email,
			emailValidated,
			password,
			phoneNumber,
			role,
			id,
		} = registerUserDto;

		const idUUv4 = id as string;

		const ExistedUser = await prisma.users.findFirst({
			where: {
				email,
			},
		});

		if (ExistedUser) {
			throw new UserNotFoundError('The user already exists!');
		}

		try {
			const passwordHash = BcryptAdapter.hash(password);

			const user = await prisma.users.create({
				data: {
					id: idUUv4,
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

	async login(loginUserDto: LoginUserDto): Promise<InterfaceReturnUser> {
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

		const token = JwtAdapter.getToken({ id: user.id, email: user.email });

		if (!token) throw new ErrorTokenUser('Error when generating token!');

		return { error: undefined, user };
	}
	async validateEmail(): Promise<any> {
		throw new Error('Method not implemented.');
	}
}
