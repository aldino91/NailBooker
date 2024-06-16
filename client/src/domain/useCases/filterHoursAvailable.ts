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
					...book,
					status: 'occupato',
					available: false,
				};
			}
		}
	});

	console.log('listHoursAvailableCopy: ', listHoursAvailableCopy);

	return listHoursAvailableCopy;
};
