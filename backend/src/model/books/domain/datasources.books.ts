import { ErrorBookingBase } from '../../../errors/bookings/error.base.booking';
import { CreatedDto } from './dtos/books/dtos.created.book';
import { UpdateDto } from './dtos/books/dtos.update.book';
import { Books } from './entity.books';

export abstract class DataSourcesBooks {
	abstract create(
		createdDto: CreatedDto
	): Promise<{ err?: ErrorBookingBase; data?: Books }>;

	abstract getById(
		id: string
	): Promise<{ err?: ErrorBookingBase; data?: Books }>;

	abstract getAllBooks(
		idUser: string
	): Promise<{ err?: ErrorBookingBase; data?: Books[] }>;

	abstract updatedBook(
		updateDto: UpdateDto
	): Promise<{ err?: ErrorBookingBase; data?: Books }>;

	abstract deleteBook(
		id: string
	): Promise<{ err?: ErrorBookingBase; data?: Books }>;
}
