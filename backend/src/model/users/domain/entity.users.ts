export class Users {
	constructor(
		public readonly name: string,
		public readonly surname: string,
		public readonly email: string,
		public readonly emailValidated: boolean,
		public readonly password: string,
		public readonly phoneNumber: string,
		public readonly role: string
	) {}
}
