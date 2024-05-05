import { ErrorTokenUser } from '../../../../errors/users/user.token.error';
import { UserRepository } from '../repository.users';

export class ValidateEmailUseCase {
	constructor(private readonly repository: UserRepository) {}

	async execute(
		token: string
	): Promise<{ error?: ErrorTokenUser; data?: string }> {
		return await this.repository.validateEmail(token);
	}
}
