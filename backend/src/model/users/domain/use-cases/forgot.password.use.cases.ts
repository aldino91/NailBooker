import { UserRepository } from '../repository.users';

export class UseCasesForgotPassword {
	constructor(private readonly repository: UserRepository) {}

	async execute(email: string): Promise<{ data?: string; status: string }> {
		return await this.repository.forgotPassword(email);
	}
}
