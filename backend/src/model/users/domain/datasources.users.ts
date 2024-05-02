import InterfaceReturnUserFetch from '../interface/interfReturnfetch';
import { LoginUserDto } from './dtos/auth/dtos.login.user';
import { RegisterUserDto } from './dtos/auth/dtos.register.user';

export abstract class UserDataSources {
	abstract register(
		registerUserDto: RegisterUserDto
	): Promise<InterfaceReturnUserFetch>;

	abstract login(loginUserDto: LoginUserDto): Promise<InterfaceReturnUserFetch>;

	abstract validateEmail(): Promise<any>;
}
