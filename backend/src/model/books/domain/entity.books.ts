export class Books {
	constructor(
		public readonly id: string,
		public readonly author: string,
		public readonly reservarName: string,
		public readonly bookingDate: string,
		public readonly bookingTime: string,
		public readonly jobType: string[],
		public readonly duration: number,
		public readonly createdAt?: Date,
		public readonly updatedAt?: Date
	) {}
}
