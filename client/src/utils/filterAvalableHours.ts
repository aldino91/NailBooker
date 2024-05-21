import { fromStringToNum } from './fromStringToNum';
import { Booking, listBook } from './interfaces';
import { sumHours } from './sumHours';
import { typeNewBook } from './types';

export const filterAvalableHours = (
	newBook: typeNewBook,
	listHoursAvalable: Array<Booking>,
	listBook: Array<listBook>
): {
	bookingAvailable: Array<Booking>;
	hourBook: number;
} => {
	const sumHoursNewBook = sumHours(newBook);

	for (let i = 0; i < listHoursAvalable.length; i++) {
		for (let reserved of listBook) {
			let hoursNotAvailables = fromStringToNum(reserved.time);
			if (listHoursAvalable[i].hourBook === reserved.hourBook) {
				listHoursAvalable[i].available = false;
				listHoursAvalable[i].status = 'occupato';
				if (hoursNotAvailables > 1) {
					for (
						let j = i;
						j < i + hoursNotAvailables && j < listHoursAvalable.length;
						j++
					) {
						listHoursAvalable[j].available = false;
						listHoursAvalable[j].status = 'occupato';
					}
				}
			}
		}
	}

	const fromStringToNumber = fromStringToNum(sumHoursNewBook);

	for (let i = 0; i < listHoursAvalable.length - 1; i++) {
		if (listHoursAvalable[i].available === true) {
			for (
				let j = i;
				j < i + fromStringToNumber && j < listHoursAvalable.length;
				j++
			) {
				if (listHoursAvalable[j].available === false) {
					listHoursAvalable[i].available = true;
					listHoursAvalable[i].status = 'non basta il tempo';
				}
			}
		}
	}

	return { bookingAvailable: listHoursAvalable, hourBook: fromStringToNumber };
};
