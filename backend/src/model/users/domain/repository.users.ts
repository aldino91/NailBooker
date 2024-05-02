import InterfaceReturnFetch from '../interface/interfReturnfetch';
import { LoginUserDto } from './dtos/auth/dtos.login.user';
import { RegisterUserDto } from './dtos/auth/dtos.register.user';

export abstract class UserRepository {
	abstract register(
		registerUserDto: RegisterUserDto
	): Promise<InterfaceReturnFetch>;

	abstract login(loginUserDto: LoginUserDto): Promise<InterfaceReturnFetch>;

	abstract validateEmail(): Promise<any>;
}
