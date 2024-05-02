import { regularExps } from '../../../../../config/regular.exp';
import { ErrorUserDtoRegister } from '../../../../../errors/users/user.dto.register';
import { Users } from '../../entity.users';
import { v4 as uuidv4 } from 'uuid';

export class RegisterUserDto {
	constructor(
		public readonly name: string,
		public readonly surname: string,
		public readonly email: string,
		public readonly emailValidated: boolean,
		public readonly password: string,
		public readonly phoneNumber: string,
		public readonly role: string,
		public readonly id: string
	) {}

	static create(object: Users): [ErrorUserDtoRegister?, RegisterUserDto?] {
		const {
			name,
			surname,
			email,
			emailValidated,
			password,
			phoneNumber,
			role,
		} = object;

		const id = uuidv4();

		if (!name) return [new ErrorUserDtoRegister('Missing name')];
		if (!surname) return [new ErrorUserDtoRegister('Missing surnaname')];
		if (!email) return [new ErrorUserDtoRegister('Missing email')];
		if (typeof emailValidated !== 'boolean')
			return [new ErrorUserDtoRegister('emailValidated is not boolean')];
		if (!regularExps.email.test(email as string))
			return [new ErrorUserDtoRegister('Email is not valid')];
		if (!password) return [new ErrorUserDtoRegister('Missing password')];
		if (password.length < 6)
			return [new ErrorUserDtoRegister('Password to short')];
		if (!phoneNumber) return [new ErrorUserDtoRegister('Missing phoneNumber')];
		if (!role) return [new ErrorUserDtoRegister('Missing role')];

		return [
			undefined,
			new RegisterUserDto(
				name,
				surname,
				email,
				emailValidated,
				password,
				phoneNumber,
				role,
				id
			),
		];
	}
}
