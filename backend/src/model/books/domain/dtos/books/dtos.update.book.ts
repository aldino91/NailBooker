import { ErrorCreatedDtos } from '../../../../../errors/bookings/error.created.dtos';

export class UpdateDto {
	private constructor(
		public readonly id: string,
		public readonly author: string,
		public readonly reservarName: string,
		public readonly bookingDate: string,
		public readonly bookingTime: string,
		public readonly jobType: string[],
		public readonly duration: number,
		public readonly usersId: string
	) {}

	static create(object: any): { err?: ErrorCreatedDtos; data?: UpdateDto } {
		const {
			id,
			author,
			reservarName,
			jobType,
			duration,
			usersId,
			bookingDate,
			bookingTime,
		} = object;

		if (!id) throw new ErrorCreatedDtos('Missing id booking!!');

		if (!author) return { err: new ErrorCreatedDtos('Missing author') };
		if (!reservarName)
			return {
				err: new ErrorCreatedDtos('Missing reservarName'),
			};
		if (!bookingDate)
			return {
				err: new ErrorCreatedDtos('Missing booking date'),
			};
		if (!bookingTime)
			return {
				err: new ErrorCreatedDtos('Missing booking time'),
			};
		if (typeof jobType !== 'object' || !Array.isArray(jobType) || !jobType) {
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
				author,
				reservarName,
				bookingDate,
				bookingTime,
				jobType,
				duration,
				usersId
			),
		};
	}
}
