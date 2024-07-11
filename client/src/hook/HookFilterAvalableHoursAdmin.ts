// import { useEffect, useState } from 'react';
// import { fromStringToNum } from '../utils/fromStringToNum';
// import { Booking, ListBook, typeNewBook } from '../utils/interfaces';
// import { sumHours } from '../utils/sumHours';

// export const useFilterAvailableHoursAdmin = (
// 	newBook: typeNewBook[],
// 	listHoursAvalable: Array<Booking>,
// 	listBook: ListBook[] | undefined
// ) => {
// 	const [bookingAvailable, setBookingAvailable] =
// 		useState<Array<Booking>>(listHoursAvalable);
// 	const [hourBook, setHourBook] = useState(0);

// 	useEffect(() => {
// 		const sumHoursNewBook = sumHours(newBook);
// 		const listHoursAvailableCopy: Booking[] = JSON.parse(
// 			JSON.stringify(listHoursAvalable)
// 		);

// 		if (listBook === undefined) {
// 		} else {
// 			for (let i = 0; i < listHoursAvailableCopy.length; i++) {
// 				for (let k = 0; k < listBook.length; k++) {
// 					let hoursNotAvailables = fromStringToNum(listBook[k].duration);
// 					if (listHoursAvailableCopy[i].hourBook === listBook[k].hourBook) {
// 						listHoursAvailableCopy[i].available = false;
// 						listHoursAvailableCopy[i].status = 'occupato';
// 						listHoursAvailableCopy[i].name = listBook[k].reservarName;
// 						listHoursAvailableCopy[i].start = listBook[k].hourBook;
// 						listHoursAvailableCopy[i].id = listBook[k].id!;
// 						if (hoursNotAvailables > 1) {
// 							for (
// 								let j = i;
// 								j < i + hoursNotAvailables && j < listHoursAvailableCopy.length;
// 								j++
// 							) {
// 								listHoursAvailableCopy[j].available = false;
// 								listHoursAvailableCopy[j].status = 'occupato';
// 								listHoursAvailableCopy[j].name = listBook[k].reservarName;
// 								listHoursAvailableCopy[j].start = listBook[k].hourBook;
// 								listHoursAvailableCopy[j].id = listBook[k].id!;
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}

// 		const fromStringToNumber = fromStringToNum(sumHoursNewBook);

// 		setBookingAvailable(listHoursAvailableCopy);

// 		setHourBook(fromStringToNumber);
// 	}, [newBook, listHoursAvalable, listBook]);

// 	return {
// 		bookingAvailable,
// 		hourBook,
// 	};
// };
