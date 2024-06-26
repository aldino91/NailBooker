import { regularExps } from '../../../../../config/regular.exp';

export class ForgotPasswordUserDto {
	static create(email: string): { error?: string; email?: string } {
		if (!email) return { error: 'Missing email' };
		if (!regularExps.email.test(email))
			return {
				error: 'Email non valido...',
			};

		return { error: undefined, email };
	}
}
