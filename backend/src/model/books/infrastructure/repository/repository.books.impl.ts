import { ErrorBookingBase } from '../../../../errors/bookings/error.base.booking';
import { DataSourcesBooks } from '../../domain/datasources.books';
import { CreatedDto } from '../../domain/dtos/books/dtos.created.book';
import { UpdateDto } from '../../domain/dtos/books/dtos.update.book';
import { Books } from '../../domain/entity.books';
import { RepositoryBooks } from '../../domain/repository.books';

export default class RepositoryBooksImpl implements RepositoryBooks {
	constructor(private datasources: DataSourcesBooks) {}
	async create(
		createdDto: CreatedDto
	): Promise<{ err?: ErrorBookingBase; data?: Books }> {
		return await this.datasources.create(createdDto);
	}
	async getById(id: string): Promise<{ err?: ErrorBookingBase; data?: Books }> {
		return await this.datasources.getById(id);
	}
	async getAllBooks(
		idUser: string
	): Promise<{ err?: ErrorBookingBase; data?: Books[] }> {
		return await this.datasources.getAllBooks(idUser);
	}
	async updatedBook(
		updatedDto: UpdateDto
	): Promise<{ err?: ErrorBookingBase; data?: Books }> {
		return await this.datasources.updatedBook(updatedDto);
	}
	async deleteBook(
		id: string
	): Promise<{ err?: ErrorBookingBase; data?: Books }> {
		return await this.datasources.deleteBook(id);
	}

	async rangeDateBooks(
		dateFrom: number,
		dateTo: number,
		id: string
	): Promise<{ err?: ErrorBookingBase; data?: Books[] }> {
		return await this.datasources.rangeDateBooks(dateFrom, dateTo, id);
	}
}
