import { fromStringToNum } from './fromStringToNum';
import { ListBook } from './interfaces';

export const filterHoursAvailable = (
	listBooks: ListBook[] | undefined,
	listHoursAvailableCopy: ListBook[]
): ListBook[] => {
	if (listBooks) {
		for (let i = 0; i < listBooks?.length; i++) {
			for (let j = i; j < listHoursAvailableCopy?.length; j++) {
				const durationBook = fromStringToNum(listBooks[i].duration);
				if (listBooks[i].hourBook === listHoursAvailableCopy[j].hourBook) {
					listHoursAvailableCopy[j] = listBooks[i];
					listHoursAvailableCopy[j].status = 'occupato';
					listHoursAvailableCopy[j].start = listBooks[i].hourBook;
					listHoursAvailableCopy[j].id = listBooks[i].id;
					for (
						let k = j + 1;
						k < j + durationBook && k + 1 < listHoursAvailableCopy.length;
						k++
					) {
						listHoursAvailableCopy[k].id = listBooks[i].id;
						listHoursAvailableCopy[k].duration = listBooks[i].duration;
						listHoursAvailableCopy[k].reservarName = listBooks[i].reservarName;
						listHoursAvailableCopy[k].available = false;
						listHoursAvailableCopy[k].services = listBooks[i].services;
						listHoursAvailableCopy[k].status = 'occupato';
						listHoursAvailableCopy[k].start = listBooks[i].hourBook;
						listHoursAvailableCopy[k].id = listBooks[i].id;
					}
				}
			}
		}
	}

	return listHoursAvailableCopy;
};
