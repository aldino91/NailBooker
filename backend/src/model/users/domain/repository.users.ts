import { ErrorTokenUser } from '../../../errors/users/user.token.error';
import IntReturnLoginUser from '../interface/intReturnLoginUser';
import IntReturnRegisterUser from '../interface/interfReturnfetch';
import { LoginUserDto } from './dtos/auth/dtos.login.user';
import { RegisterUserDto } from './dtos/auth/dtos.register.user';

export abstract class UserRepository {
	abstract register(
		registerUserDto: RegisterUserDto
	): Promise<IntReturnRegisterUser>;

	abstract login(loginUserDto: LoginUserDto): Promise<IntReturnLoginUser>;

	abstract validateEmail(
		token: string
	): Promise<{ error?: ErrorTokenUser; data?: string }>;

	abstract forgotPassword(
		email: string
	): Promise<{ data?: string; status: string }>;

	abstract resetPassword(
		id: string,
		confirm: string
	): Promise<{ data?: string }>;
}
