import { regularExps } from '../../../../../config/regular.exp';
import { ErrorUserLoginDto } from '../../../../../errors/users/user.dto.login';

export class LoginUserDto {
	constructor(
		public readonly email: string,
		public readonly password: string
	) {}

	static create(object: { [key: string]: string }): {
		error?: string;
		user?: LoginUserDto;
	} {
		const { email, password } = object;

		if (!email)
			return { error: new ErrorUserLoginDto('Missing email').descriptions };
		if (!regularExps.email.test(email))
			return {
				error: new ErrorUserLoginDto('Email is not valid').descriptions,
			};
		if (!password)
			return { error: new ErrorUserLoginDto('Missing password').descriptions };

		return { error: undefined, user: new LoginUserDto(email, password) };
	}
}
