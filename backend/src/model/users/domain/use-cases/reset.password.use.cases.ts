import { UserRepository } from '../repository.users';

export class UseCasesResetPassword {
	constructor(private readonly repository: UserRepository) {}

	async execute(id: string, confirm: string): Promise<{ data?: string }> {
		return await this.repository.resetPassword(id, confirm);
	}
}
