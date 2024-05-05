import { ErrorTokenUser } from '../../../../errors/users/user.token.error';
import { UserDataSources } from '../../domain/datasources.users';
import { LoginUserDto } from '../../domain/dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../../domain/dtos/auth/dtos.register.user';
import { UserRepository } from '../../domain/repository.users';
import IntReturnLoginUser from '../../interface/intReturnLoginUser';
import IntReturnRegisterUser from '../../interface/interfReturnfetch';

export class UserRepositoryImpl implements UserRepository {
	constructor(private datasources: UserDataSources) {}
	async register(
		registerUserDto: RegisterUserDto
	): Promise<IntReturnRegisterUser> {
		return await this.datasources.register(registerUserDto);
	}
	async login(loginUserDto: LoginUserDto): Promise<IntReturnLoginUser> {
		return await this.datasources.login(loginUserDto);
	}
	async validateEmail(
		token: string
	): Promise<{ error?: ErrorTokenUser; data?: string }> {
		return await this.datasources.validateEmail(token);
	}
}
