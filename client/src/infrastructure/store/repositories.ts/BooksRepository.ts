import {
	DataCreatedBook,
	fetchCreatedBookings,
} from '../../../api/fetchCreatedBooking';
import { fetchDeleteBook } from '../../../api/fetchDeleteBook';
import { fecthRangeDateBooks } from '../../../api/fetchRangeDateBooks';
import { DataUpdate, fetchUpdateBook } from '../../../api/fetchUpdateBook';
import { Books } from '../../../domain/entities/Books';
import { IBooksRepository } from '../../../domain/repository/IRepositoryBook';

export class BooksRepository implements IBooksRepository {
	async rangeDateBooks(dateFrom: number, dateTo: number): Promise<Books[]> {
		const response = await fecthRangeDateBooks(dateFrom, dateTo);
		return response?.data;
	}
	async createBook(book: DataCreatedBook): Promise<Books> {
		const response = await fetchCreatedBookings(book);
		return response?.data.data;
	}
	async updateBook(book: DataUpdate): Promise<Books> {
		const response = await fetchUpdateBook(book);
		return response?.data.data;
	}
	async deleteBook(id: string): Promise<string> {
		const response = await fetchDeleteBook(id);
		return response?.data.data.id;
	}
}
