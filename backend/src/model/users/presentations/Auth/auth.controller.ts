import { Request, Response } from 'express';
import { LoginUserDto } from '../../domain/dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../../domain/dtos/auth/dtos.register.user';
import { UserRepository } from '../../domain/repository.users';
import { LoginUserUseCase } from '../../domain/use-cases/login.use.cases';
import { RegisterUserUseCase } from '../../domain/use-cases/register.use.cases';
import { ValidateEmailUseCase } from '../../domain/use-cases/validate.email.use.case';
import path from 'path';
import { ErrorInternalServer } from '../../../../errors/error.internal.server';
import { envs } from '../../../../config/envs';
import { UseCasesForgotPassword } from '../../domain/use-cases/forgot.password.use.cases';
import { UseCasesResetPassword } from '../../domain/use-cases/reset.password.use.cases';
import IntReturnLoginUser from '../../interface/intReturnLoginUser';
import { ForgotPasswordUserDto } from '../../domain/dtos/auth/dtos.forgot.password';
import { ResetetPassowrdUserDto } from '../../domain/dtos/auth/dtos.reset.password';

export class AuthController {
	constructor(public readonly userRepository: UserRepository) {}

	register = (req: Request, res: Response) => {
		const [error, registerDto] = RegisterUserDto.create(req.body);

		if (error) return res.status(400).json({ error });

		new RegisterUserUseCase(this.userRepository)
			.execute(registerDto!)
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((error) => {
				res.status(404).json({ error });
			});
	};

	login = (req: Request, res: Response) => {
		const { error, user } = LoginUserDto.create(req.body);

		if (error !== undefined) {
			res.status(200).json({ error });
		} else {
			new LoginUserUseCase(this.userRepository)
				.execute(user!)
				.then((resp) => {
					const { error, user, token } = resp;

					if (error !== undefined) {
						res.status(200).json({ error });
					} else {
						res.cookie('auth_token', token, {
							httpOnly: true,
							secure: envs.COOKIES_SECURE,
							maxAge: 24 * 60 * 60 * 1000,
						});

						res.status(200).json({ user, message: 'Login successful' });
					}
				})
				.catch((error) => {
					res.status(500).json({ error });
				});
		}
	};

	validateEmail = (req: Request, res: Response) => {
		const { token } = req.params;

		new ValidateEmailUseCase(this.userRepository)
			.execute(token)
			.then(({ error, data }) => {
				if (error !== undefined) {
					res.sendFile(
						path.join(
							__dirname,
							'../../../../../public',
							'tokenValidatedEmailExpired.html'
						)
					);
				} else {
					res.sendFile(
						path.join(
							__dirname,
							'../../../../../public',
							'successValidatedEmail.html'
						)
					);
				}
			})
			.catch((error) => {
				return new ErrorInternalServer('Error validated email!');
			});
	};

	resendToken = async (req: Request, res: Response) => {
		const { token } = req.params;
		new ValidateEmailUseCase(this.userRepository)
			.execute(token)
			.catch((error) => {
				return new ErrorInternalServer('Error validated email!');
			});
	};

	protectedRoute = async (req: Request, res: Response) => {
		const user = req.body;
		res.status(200).send({ message: 'Successful authorisation', user });
	};

	forgotPassword = (req: Request, res: Response) => {
		const { email } = req.body;

		const { error, email: data } = ForgotPasswordUserDto.create(email);

		if (error !== undefined) {
			res.status(200).send({ data: error, status: 'warn' });
		}

		if (data !== undefined) {
			new UseCasesForgotPassword(this.userRepository)
				.execute(data)
				.then(({ data, status }) => {
					res.status(200).send({ data, status });
				})
				.catch((error) => {
					console.error('Error forgot password: ', error);
					res
						.status(500)
						.send({ data: 'Error Internal server...', status: 'error' });
				});
		}
	};

	resetPassword = (req: Request, res: Response) => {
		const { id, confirm } = req.body;

		const {
			error,
			id: ID,
			password,
		} = ResetetPassowrdUserDto.create(id, confirm);

		if (error !== undefined) {
			res.status(200).json({ data: error, status: 'warn' });
		}

		if (ID !== undefined && password !== undefined) {
			new UseCasesResetPassword(this.userRepository)
				.execute(ID, password)
				.then((data) => {
					res.status(200).json({ data: data.data, status: 'success' });
				})
				.catch((error) => {
					console.error('Error reset password: ', error);
					res
						.status(500)
						.send({ data: 'Error Internal server...', status: 'error' });
				});
		}
	};
}
