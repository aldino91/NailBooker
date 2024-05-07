import { ErrorCreatedDtos } from '../../../../../errors/bookings/error.created.dtos';

export class CreatedDto {
	private constructor(
		public readonly author: string,
		public readonly reservarName: string,
		public readonly bookingDate: string,
		public readonly bookingTime: string,
		public readonly jobType: string[],
		public readonly duration: number,
		public readonly usersId?: string
	) {}

	static create(object: any): CreatedDto {
		const {
			author,
			reservarName,
			jobType,
			duration,
			usersId,
			bookingDate,
			bookingTime,
		} = object;

		if (!author) throw new ErrorCreatedDtos('Missing author!!');
		if (!reservarName) throw new ErrorCreatedDtos('Missing Reserved Name!!');
		if (!bookingDate) throw new ErrorCreatedDtos('Missing Booking Date !!');
		if (!bookingTime) throw new ErrorCreatedDtos('Missing Booking Time !!');
		if (!jobType) throw new ErrorCreatedDtos('Missing Job Type!!');
		if (!duration) throw new ErrorCreatedDtos('Missing duration job!!');
		if (typeof duration !== 'number')
			throw new ErrorCreatedDtos('Error type duration job, is number!!');

		return new CreatedDto(
			author,
			reservarName,
			bookingDate,
			bookingTime,
			jobType,
			duration,
			usersId
		);
	}
}
