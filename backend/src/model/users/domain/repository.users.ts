import { LoginUserDto } from './dtos/auth/dtos.login.user';
import { RegisterUserDto } from './dtos/auth/dtos.register.user';
import { Users } from './entity.users';

export abstract class UserRepository {
	abstract register(registerUserDto: RegisterUserDto): Promise<Users>;

	abstract login(loginUserDto: LoginUserDto): Promise<Users>;

	abstract validateEmail(): Promise<any>;
}
