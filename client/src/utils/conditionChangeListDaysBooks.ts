import { Books } from '../domain/entities/Books';

interface Props {
	index: number;
	durationBook: number;
	listBookDays: Books[];
	bookSelected: Books;
}

export const conditionChangeListDaysBooks = ({
	index,
	durationBook,
	listBookDays,
	bookSelected,
}: Props): boolean => {
	for (
		let j = index;
		j < index + durationBook && j < listBookDays?.length;
		j++
	) {
		if (bookSelected?.id === listBookDays[j].id || listBookDays[j].id === '') {
		} else {
			return false;
		}
	}

	return true;
};
