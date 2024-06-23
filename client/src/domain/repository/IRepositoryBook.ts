import { DataCreatedBook } from '../../api/fetchCreatedBooking';
import { DataUpdate } from '../../api/fetchUpdateBook';
import { Books } from '../entities/Books';

export interface IBooksRepository {
	rangeDateBooks(dateFrom: number, dateTo: number): Promise<Books[]>;
	createBook(book: DataCreatedBook): Promise<Books>;
	updateBook(book: DataUpdate): Promise<Books>;
	deleteBook(id: string): Promise<string>;
}
