import { Request, Response } from 'express';
import { LoginUserDto } from '../../domain/dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../../domain/dtos/auth/dtos.register.user';
import { UserRepository } from '../../domain/repository.users';
import { LoginUserUseCase } from '../../domain/use-cases/login.use.cases';
import { RegisterUserUseCase } from '../../domain/use-cases/register.use.cases';
import { ValidateEmailUseCase } from '../../domain/use-cases/validate.email.use.case';
import path from 'path';
import { ErrorInternalServer } from '../../../../errors/error.internal.server';
import { ErrorTokenUser } from '../../../../errors/users/user.token.error';

export class AuthController {
	constructor(public readonly userRepository: UserRepository) {}

	register = async (req: Request, res: Response) => {
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
		const [error, loginUserDto] = LoginUserDto.create(req.body);

		if (error) return res.status(400).json({ error });

		new LoginUserUseCase(this.userRepository)
			.execute(loginUserDto!)
			.then((user) => {
				res.json(user);
			})
			.catch((error) => res.status(400).json({ error }));
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

	resendToken = (req: Request, res: Response) => {
		const { token } = req.params;
		new ValidateEmailUseCase(this.userRepository)
			.execute(token)
			.catch((error) => {
				return new ErrorInternalServer('Error validated email!');
			});
	};
}
