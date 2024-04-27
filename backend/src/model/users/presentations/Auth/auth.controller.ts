import { Request, Response } from 'express';
import { LoginUserDto } from '../../domain/dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../../domain/dtos/auth/dtos.register.user';
import { UserRepository } from '../../domain/repository.users';
import { LoginUserUseCase } from '../../domain/use-cases/login.use.cases';
import { RegisterUserUseCase } from '../../domain/use-cases/register.use.cases';

export class AuthController {
	constructor(public readonly userRepository: UserRepository) {}

	register = (req: Request, res: Response) => {
		const [error, registerDto] = RegisterUserDto.create(req.body);

		if (error) res.status(400).json({ error });

		// this.userRepository.register(registerDto!);

		new RegisterUserUseCase(this.userRepository)
			.execute(registerDto!)
			.then(() => res.json())
			.catch((error) => res.status(400).json({ error }));
	};

	login = (req: Request, res: Response) => {
		const [error, loginUserDto] = LoginUserDto.create(req.body);

		if (error) return res.status(400).json({ error });

		// this.userRepository.login(loginUserDto!);

		new LoginUserUseCase(this.userRepository)
			.execute(loginUserDto!)
			.then((user) => res.json(user))
			.catch((error) => res.status(400).json({ error }));
	};

	validateEmail = (req: Request, res: Response) => {
		res.json('validateEmailUser');
	};
}
