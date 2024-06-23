import { fromStringToNum } from '../../utils/fromStringToNum';
import { Books } from '../entities/Books';

export const filterHoursAvailable = (
	listBooks: Books[] | undefined,
	listHoursAvailableCopy: Books[]
): Books[] => {
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
					hourBook: listHoursAvailableCopy[i].hourBook,
					duration: book.duration,
					reservarName: book.reservarName,
					services: book.services,
					dayBook: book.dayBook,
					start: book.hourBook,
					id: book.id,
					status: 'occupato',
					available: false,
				};
			}
		}
	});

	return listHoursAvailableCopy;
};
