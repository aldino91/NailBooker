export class Books {
	constructor(
		public readonly reservarName: string,
		public readonly dayBook: string,
		public readonly hourBook: string,
		public readonly services: string[],
		public readonly duration: string,
		public readonly createdAt?: Date,
		public readonly updatedAt?: Date,
		public readonly id?: string
	) {}
}
