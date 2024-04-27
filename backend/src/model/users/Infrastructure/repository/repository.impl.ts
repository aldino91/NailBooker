import { UserDataSources } from '../../domain/datasources.users';
import { LoginUserDto } from '../../domain/dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../../domain/dtos/auth/dtos.register.user';
import { Users } from '../../domain/entity.users';
import { UserRepository } from '../../domain/repository.users';

export class UserRepositoryImpl implements UserRepository {
	constructor(private datasources: UserDataSources) {}
	async register(registerUserDto: RegisterUserDto): Promise<Users> {
		return await this.datasources.register(registerUserDto);
	}
	async login(loginUserDto: LoginUserDto): Promise<Users> {
		return await this.datasources.login(loginUserDto);
	}
	async validateEmail(): Promise<any> {
		return await this.datasources.validateEmail();
	}
}
