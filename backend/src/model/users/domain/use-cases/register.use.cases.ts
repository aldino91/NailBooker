import { LoginUserDto } from '../dtos/auth/dtos.login.user';
import { RegisterUserDto } from '../dtos/auth/dtos.register.user';
import { Users } from '../entity.users';
import { UserRepository } from '../repository.users';
import { BasesUseCaseUsers } from './base.use-cases';

export class RegisterUserUseCase implements BasesUseCaseUsers<RegisterUserDto> {
	constructor(private readonly repository: UserRepository) {}

	async execute(dto: RegisterUserDto): Promise<Users> {
		return this.repository.register(dto);
	}
}
