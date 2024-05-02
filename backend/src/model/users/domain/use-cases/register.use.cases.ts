import InterfaceReturnFetch from '../../interface/interfReturnfetch';
import { RegisterUserDto } from '../dtos/auth/dtos.register.user';
import { UserRepository } from '../repository.users';
import { BasesUseCaseUsers } from './base.use-cases';

export class RegisterUserUseCase implements BasesUseCaseUsers<RegisterUserDto> {
	constructor(private readonly repository: UserRepository) {}

	async execute(dto: RegisterUserDto): Promise<InterfaceReturnFetch> {
		return await this.repository.register(dto);
	}
}
