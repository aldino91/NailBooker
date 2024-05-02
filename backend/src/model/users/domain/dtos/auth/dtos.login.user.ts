import { regularExps } from '../../../../../config/regular.exp';
import { ErrorUserLoginDto } from '../../../../../errors/users/user.dto.login';

export class LoginUserDto {
	constructor(
		public readonly email: string,
		public readonly password: string
	) {}

	static create(object: {
		[key: string]: string;
	}): [ErrorUserLoginDto?, LoginUserDto?] {
		const { email, password } = object;

		if (!email) return [new ErrorUserLoginDto('Missing email')];
		if (!regularExps.email.test(email))
			return [new ErrorUserLoginDto('Email is not valid')];
		if (!password) return [new ErrorUserLoginDto('Missing password')];
		if (password.length < 6)
			return [new ErrorUserLoginDto('Password to short')];

		return [undefined, new LoginUserDto(email, password)];
	}
}
