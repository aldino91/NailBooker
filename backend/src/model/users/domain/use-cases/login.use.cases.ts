import InterfaceReturnFetch from '../../interface/interfReturnfetch';
import { LoginUserDto } from '../dtos/auth/dtos.login.user';
import { UserRepository } from '../repository.users';
import { BasesUseCaseUsers } from './base.use-cases';

export class LoginUserUseCase implements BasesUseCaseUsers<LoginUserDto> {
	constructor(private readonly repository: UserRepository) {}

	async execute(dto: LoginUserDto): Promise<InterfaceReturnFetch> {
		return this.repository.login(dto);
	}
}
