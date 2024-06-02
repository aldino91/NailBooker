import { ErrorCreatedDtos } from '../../../../../errors/bookings/error.created.dtos';

export class UpdateDto {
	private constructor(
		public readonly id: string,
		public readonly reservarName: string,
		public readonly dayBook: string,
		public readonly hourBook: string,
		public readonly services: string[],
		public readonly duration: string,
		public readonly usersId: string
	) {}

	static create(object: any): { err?: ErrorCreatedDtos; data?: UpdateDto } {
		const { id, reservarName, services, duration, usersId, dayBook, hourBook } =
			object;

		if (!id) throw new ErrorCreatedDtos('Missing id booking!!');

		if (!reservarName)
			return {
				err: new ErrorCreatedDtos('Missing reservarName'),
			};
		if (!dayBook)
			return {
				err: new ErrorCreatedDtos('Missing booking date'),
			};
		if (!hourBook)
			return {
				err: new ErrorCreatedDtos('Missing booking time'),
			};
		if (typeof services !== 'object' || !Array.isArray(services) || !services) {
			return {
				err: new ErrorCreatedDtos(
					'The type of Job Type is incorrect, or missing job type'
				),
			};
		}
		if (!duration)
			return {
				err: new ErrorCreatedDtos('Missing duration'),
			};

		return {
			err: undefined,
			data: new UpdateDto(
				id,
				reservarName,
				dayBook,
				hourBook,
				services,
				duration,
				usersId
			),
		};
	}
}
