import { fromStringToNum } from './fromStringToNum';
import { ListBook } from './interfaces';

export const filterHoursAvailable = (
	listBooks: ListBook[] | undefined,
	listHoursAvailableCopy: ListBook[]
): ListBook[] => {
	if (!listBooks) return listHoursAvailableCopy;

	listBooks.forEach((book) => {
		const durationBook = fromStringToNum(book.duration);
		const startIndex = listHoursAvailableCopy.findIndex(
			(hour) => hour.hourBook === book.hourBook
		);

		if (startIndex !== -1) {
			for (
				let i = startIndex;
				i < startIndex + durationBook && i < listHoursAvailableCopy.length;
				i++
			) {
				listHoursAvailableCopy[i] = {
					...listHoursAvailableCopy[i],
					...book,
					status: 'occupato',
					available: false,
				};
			}
		}
	});

	return listHoursAvailableCopy;
};
