import { Books } from '../../domain/entities/Books';
import { create } from 'zustand';
import { dateFromTo } from '../../utils/dateFromTo';
import { fecthRangeDateBooks } from '../../api/fetchRangeDateBooks';
import { filterHoursAvailable } from '../../domain/useCases/filterHoursAvailable';
import { getWeek } from 'date-fns';
import { listHoursAvalable } from '../../utils/constants';

interface ReservationState {
	listBooks: Books[] | undefined;
	listBookDays: Books[] | undefined;
	startDate: Date;
	weekCurrent: number;
	dateSelected: Date;
	refreshGet: boolean;
	setStartDate: (date: Date) => void;
	fetchBooks: () => Promise<void>;
	filterBooksByDate: (date: Date) => void;
	updateListBooks: (listBooks: Books[]) => void;
}

export const useReservationStore = create<ReservationState>((set, get) => ({
	listBooks: undefined,
	listBookDays: undefined,
	startDate: new Date(),
	weekCurrent: getWeek(new Date()),
	dateSelected: new Date(),
	refreshGet: false,
	setStartDate: (date: Date) => set({ startDate: date }),
	fetchBooks: async () => {
		console.log('fetchBooks... ');
		const { dateFrom, dateTo } = dateFromTo(get().startDate);
		try {
			const resp = await fecthRangeDateBooks(dateFrom, dateTo);
			console.log('Response data: ', resp?.data);
			set({
				dateSelected: get().startDate,
				listBooks: resp?.data,
			});
		} catch (err) {
			console.error(err);
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
		const listHoursAvailableCopy = get().listBookDays || [];
		const updatedList = filterHoursAvailable(listBooks, listHoursAvailableCopy);
		set({ listBooks: updatedList });
	},
}));
