import { ErrorBookingBase } from '../../../../errors/bookings/error.base.booking';
import { ErrorInternalServer } from '../../../../errors/error.internal.server';
import { ErrorUserBase } from '../../../../errors/users/user.base.error';
import prisma from '../../../../postgres';
import { dateFromTimeStamp } from '../../../../utils/dateFromTimeStamp';
import EmailService from '../../../users/presentations/EmailService.ts/EmailService';
import sendEmailBooking from '../../../users/presentations/EmailService.ts/sendEmailBooking';
import { DataSourcesBooks } from '../../domain/datasources.books';
import { CreatedDto } from '../../domain/dtos/books/dtos.created.book';
import { UpdateDto } from '../../domain/dtos/books/dtos.update.book';
import { Books } from '../../domain/entity.books';

export class DatasourcesBooksPostegresImpl implements DataSourcesBooks {
	constructor(private readonly emailService: EmailService) {}

	async create(
		createdDto: CreatedDto
	): Promise<{ err?: ErrorBookingBase; data?: Books }> {
		const { duration, services, reservarName, dayBook, hourBook, usersId } =
			createdDto;

		const user = await prisma.users.findFirst({
			where: {
				id: usersId,
			},
		});

		if (!user) return { err: new ErrorUserBase("This user doesn't exist") };

		const isReserved = await prisma.bookings.findFirst({
			where: {
				dayBook,
				hourBook,
			},
		});

		if (isReserved)
			return { err: new ErrorBookingBase('This hour is already booked') };

		try {
			const book = await prisma.bookings.create({
				data: {
					reservarName,
					dayBook,
					hourBook,
					services,
					duration,
					usersId,
				},
			});

			const date = dateFromTimeStamp(book.dayBook);

			if (book) {
				const sent = await sendEmailBooking(
					this.emailService,
					user.email,
					date,
					book.hourBook
				);

				if (sent === false)
					return {
						err: new ErrorBookingBase('Error sending confirmation email'),
					};
			}

			return { err: undefined, data: book };
		} catch (error) {
			return {
				err: new ErrorInternalServer('Error for created booking...!'),
				data: undefined,
			};
		}
	}
	async getById(id: string): Promise<{ err?: ErrorBookingBase; data?: Books }> {
		try {
			const book = await prisma.bookings.findFirst({
				where: {
					id,
				},
			});

			if (!book)
				return { err: new ErrorBookingBase('Error to find the reservation') };

			return { err: undefined, data: book };
		} catch (error) {
			return {
				err: new ErrorBookingBase('Error to find the reservation'),
				data: undefined,
			};
		}
	}
	async getAllBooks(
		idUser: string
	): Promise<{ err?: ErrorBookingBase; data?: Books[] }> {
		const user = await prisma.users.findFirst({
			where: {
				id: idUser,
			},
		});

		if (!user) return { err: new ErrorUserBase("This user doesn't exist") };

		try {
			const books = await prisma.bookings.findMany({
				where: {
					usersId: idUser,
				},
			});

			if (!books)
				return { err: new ErrorBookingBase('Error to find all reservations') };

			return { err: undefined, data: books };
		} catch (error) {
			return { err: new ErrorInternalServer('Error to find all reservations') };
		}
	}
	async updatedBook(
		updateDto: UpdateDto
	): Promise<{ err?: ErrorBookingBase; data?: Books }> {
		const { id, dayBook, hourBook, duration, services, reservarName } =
			updateDto;

		const book = await prisma.bookings.findFirst({
			where: {
				id,
			},
		});

		if (!book)
			return { err: new ErrorBookingBase('Error to find the reservation') };

		try {
			const updateBook = await prisma.bookings.update({
				where: {
					id,
				},
				data: {
					dayBook,
					hourBook,
					duration,
					services,
					reservarName,
				},
			});

			return { err: undefined, data: updateBook };
		} catch (error) {}
		return {
			err: new ErrorBookingBase('Method not implemented.'),
			data: undefined,
		};
	}
	async deleteBook(
		id: string
	): Promise<{ err?: ErrorBookingBase; data?: Books }> {
		const isExisted = await prisma.bookings.findFirst({
			where: {
				id,
			},
		});

		if (!isExisted)
			return { err: new ErrorBookingBase('We could not find the reservation') };
		try {
			const book = await prisma.bookings.delete({
				where: {
					id,
				},
			});

			if (!book)
				return { err: new ErrorBookingBase('Error to delete the booking') };

			return { err: undefined, data: book };
		} catch (error) {
			return { err: new ErrorInternalServer('Error to delete the booking') };
		}
	}
}
