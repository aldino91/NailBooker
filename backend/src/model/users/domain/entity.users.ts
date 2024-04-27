export class Users {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly surnaname: string,
		public readonly email: string,
		public readonly emailValidated: boolean,
		public readonly password: string,
		public readonly phoneNumber: number,
		public readonly role: string,
		public readonly created_at: string
	) {}
}
