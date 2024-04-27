import { UserDataSources } from '../../domain/datasources.users';
import { LoginUserDto } from '../../domain/dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../../domain/dtos/auth/dtos.register.user';
import { Users } from '../../domain/entity.users';
import { UserRepository } from '../../domain/repository.users';

export class UserDataSourcesPostgresImpl implements UserDataSources {
	async register(registerUserDto: RegisterUserDto): Promise<Users> {
		throw new Error('Method not implemented.');
	}
	async login(loginUserDto: LoginUserDto): Promise<Users> {
		throw new Error('Method not implemented.');
	}
	async validateEmail(): Promise<any> {
		throw new Error('Method not implemented.');
	}
}
