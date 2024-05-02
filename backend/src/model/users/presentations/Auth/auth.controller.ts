import { Request, Response } from 'express';
import { LoginUserDto } from '../../domain/dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../../domain/dtos/auth/dtos.register.user';
import { UserRepository } from '../../domain/repository.users';
import { LoginUserUseCase } from '../../domain/use-cases/login.use.cases';
import { RegisterUserUseCase } from '../../domain/use-cases/register.use.cases';
import { ErrorUserRegisterUseCase } from '../../../../errors/users/user.register.use.case';

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
		res.json('validateEmailUser');
	};
}
