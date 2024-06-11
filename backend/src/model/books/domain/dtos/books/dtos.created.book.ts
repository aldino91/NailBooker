import { ErrorCreatedDtos } from '../../../../../errors/bookings/error.created.dtos';

export class CreatedDto {
	private constructor(
		public readonly reservarName: string,
		public readonly dayBook: number,
		public readonly hourBook: string,
		public readonly services: string[],
		public readonly duration: string,
		public readonly usersId?: string
	) {}

	static create(object: any): CreatedDto {
		const { reservarName, services, duration, usersId, dayBook, hourBook } =
			object;
		if (!reservarName) throw new ErrorCreatedDtos('Missing Reserved Name!!');
		if (!dayBook) throw new ErrorCreatedDtos('Missing Booking Date !!');
		if (!hourBook) throw new ErrorCreatedDtos('Missing Booking Time !!');
		if (!services) throw new ErrorCreatedDtos('Missing Job Type!!');
		if (!duration) throw new ErrorCreatedDtos('Missing duration job!!');

		return new CreatedDto(
			reservarName,
			dayBook,
			hourBook,
			services,
			duration,
			usersId
		);
	}
}
