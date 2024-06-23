import { Books } from '../../domain/entities/Books';
import { create } from 'zustand';
import { dateFromTo } from '../../utils/dateFromTo';
import { filterHoursAvailable } from '../../domain/useCases/filterHoursAvailable';
import { getWeek } from 'date-fns';
import { books, listHoursAvalable } from '../../utils/constants';
import { DataCreatedBook } from '../../api/fetchCreatedBooking';
import { DataUpdate } from '../../api/fetchUpdateBook';
import { fromStringToNum } from '../../utils/fromStringToNum';
import { BooksRepository } from './repositories.ts/BooksRepository';
import LocalStorageHelper from '../../utils/localStorage';

interface ReservationState {
	isLoading: boolean;
	setIsLoading: () => void;
	listBooks: Books[] | undefined;
	setListBooks: (books: Books) => void;
	bookSelected: Books | undefined;
	setBookSelected: (book: Books) => void;
	listBookDays: Books[] | undefined;
	updateListBookDays: (book: Books, hourSelected: string) => void;
	startDate: Date;
	weekCurrent: number;
	dateSelected: Date;
	refreshGet: boolean;
	setRefreshGet: () => void;
	setStartDate: (date: Date) => void;
	fetchBooks: () => Promise<void>;
	fetchCreatedBook: (
		book: DataCreatedBook
	) => Promise<{ error?: Error; data?: Books }>;
	filterBooksByDate: (date: Date) => void;
	updateListBooks: (listBooks: Books[]) => void;
	fetchBookUpdate: (data: DataUpdate) => void;
	deleteBook: (id: string) => Promise<boolean>;
}

const booksRepository = new BooksRepository();

export const useReservationStore = create<ReservationState>((set, get) => ({
	isLoading: false,
	setIsLoading: () => {
		const loading = get().isLoading;
		set({
			isLoading: !loading,
		});
	},
	listBooks: undefined,
	setListBooks: (book: Books) => {
		const listBooks = get().listBooks;

		if (listBooks) {
			set({
				listBooks: [...listBooks, book],
			});
		} else {
			set({
				listBooks: [book],
			});
		}
	},
	bookSelected: undefined,
	setBookSelected: (book: Books) =>
		set({
			bookSelected: book,
		}),
	listBookDays: undefined,
	updateListBookDays: (book: Books, hourSelected: string) => {
		const booksDays = get().listBookDays;
		const bookSelected = get().bookSelected;

		const localStorage = new LocalStorageHelper();

		const previousList = localStorage.load('PreviousListBook');

		if (previousList === null) {
			localStorage.save('PreviousListBook', booksDays);
		}

		if (!booksDays) {
			console.error('listBookDays is undefined');
			return;
		}

		const durationBook = fromStringToNum(book.duration);
		const startIndex = booksDays.findIndex(
			(hour) => hour.hourBook === hourSelected
		);

		if (startIndex === -1) {
			console.error('Invalid hourSelected:', hourSelected);
			return;
		}

		const updatedBooksDays = booksDays.map((data) => {
			if (data.id === book.id) {
				return { ...books, hourBook: data.hourBook };
			}
			return data;
		});

		for (
			let j = startIndex;
			j < startIndex + durationBook && j < updatedBooksDays.length;
			j++
		) {
			updatedBooksDays[j] = {
				...book,
				hourBook: updatedBooksDays[j].hourBook,
				status: 'occupato',
				start: updatedBooksDays[startIndex].hourBook,
			};
		}

		set({
			listBookDays: updatedBooksDays,
			bookSelected: { ...bookSelected!, hourBook: hourSelected },
		});
	},
	startDate: new Date(),
	weekCurrent: getWeek(new Date()),
	dateSelected: new Date(),
	refreshGet: false,
	setRefreshGet: () => set({ refreshGet: !get().refreshGet }),
	setStartDate: (date: Date) => set({ startDate: date }),
	fetchBooks: async () => {
		const { dateFrom, dateTo } = dateFromTo(get().startDate);

		const setIsLoading = get().setIsLoading;

		try {
			setTimeout(async () => {
				setIsLoading();
			}, 1000);

			const books = await booksRepository.rangeDateBooks(dateFrom, dateTo);

			setIsLoading();

			set({
				dateSelected: get().startDate,
				listBooks: books,
			});
		} catch (err) {
			setIsLoading();
			console.error(err);
		}
	},
	fetchCreatedBook: async (
		book: DataCreatedBook
	): Promise<{ error?: Error; data?: Books }> => {
		try {
			const resp = await booksRepository.createBook(book);

			const newBook: Books = resp;

			get().setListBooks(newBook);

			return { error: undefined, data: resp };
		} catch (error) {
			console.log(error);
			const errorMessage =
				error instanceof Error ? error.message : String(error);

			return { error: new Error(errorMessage), data: undefined };
		}
	},
	filterBooksByDate: (date: Date) => {
		const { dateCurrent } = dateFromTo(date);
		const listHoursAvailableCopy: Books[] = JSON.parse(
			JSON.stringify(listHoursAvalable)
		);

		const listBooks = get().listBooks;
		if (listBooks) {
			const bookForDayCurrent = listBooks.filter(
				(book) => book.dayBook === dateCurrent
			);

			const updatedList = filterHoursAvailable(
				bookForDayCurrent,
				listHoursAvailableCopy
			);
			set({ listBookDays: updatedList });
		}
	},
	updateListBooks: (listBooks) => {
		const listHoursAvailableCopy: Books[] = JSON.parse(
			JSON.stringify(listHoursAvalable)
		);
		const updatedList = filterHoursAvailable(listBooks, listHoursAvailableCopy);

		set({ listBooks: updatedList });
	},
	fetchBookUpdate: async (book): Promise<boolean> => {
		const list = get().listBooks;
		try {
			const resp = await booksRepository.updateBook(book);

			const newList = list?.map((book) => (book.id === resp?.id ? resp : book));
			set({
				listBooks: newList,
			});
			return true;
		} catch (error) {
			console.log('Error => ', error);

			return false;
		}
	},

	deleteBook: async (id: string): Promise<boolean> => {
		const list = get().listBooks;
		try {
			const idDelete = await booksRepository.deleteBook(id);
			const newList = list?.filter((book) => book.id !== idDelete);
			set({
				listBooks: newList,
			});
			return true;
		} catch (error) {
			console.log('Error: ', error);
			return false;
		}
	},
}));
