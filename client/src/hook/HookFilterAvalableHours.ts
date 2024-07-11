// import { useEffect, useState } from 'react';
// import { fromStringToNum } from '../utils/fromStringToNum';
// import { Booking, ListBookDays, typeNewBook } from '../utils/interfaces';
// import { sumHours } from '../utils/sumHours';
// import { formatDate } from '../utils/formateDate';

// export const useFilterAvalableHours = (
// 	newBook: typeNewBook[],
// 	listHoursAvalable: Array<Booking>,
// 	listBook: ListBookDays[],
// 	dayCurrent: string
// ) => {
// 	const [bookingAvailable, setBookingAvailable] =
// 		useState<Array<Booking>>(listHoursAvalable);
// 	const [hourBook, setHourBook] = useState(0);

// 	useEffect(() => {
// 		const sumHoursNewBook = sumHours(newBook);
// 		const dateCurrent = formatDate(dayCurrent);
// 		const filterDayAvailable = listBook.find(
// 			(date) => date.day === dateCurrent
// 		);
// 		const listBookDayCurrent = filterDayAvailable?.book;
// 		const listHoursAvailableCopy = JSON.parse(
// 			JSON.stringify(listHoursAvalable)
// 		);
// 		if (listBookDayCurrent) {
// 			for (let i = 0; i < listHoursAvalable.length; i++) {
// 				for (let k = 0; k < listBookDayCurrent.length; k++) {
// 					let hoursNotAvailables = fromStringToNum(
// 						listBookDayCurrent[k].hourBook
// 					);
// 					if (
// 						listHoursAvalable[i].hourBook === listBookDayCurrent[k].hourBook
// 					) {
// 						listHoursAvalable[i].available = false;
// 						listHoursAvalable[i].status = 'occupato';
// 						if (hoursNotAvailables > 1) {
// 							for (
// 								let j = i;
// 								j < i + hoursNotAvailables && j < listHoursAvalable.length;
// 								j++
// 							) {
// 								listHoursAvalable[j].available = false;
// 								listHoursAvalable[j].status = 'occupato';
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 		const fromStringToNumber = fromStringToNum(sumHoursNewBook);

// 		setBookingAvailable(listHoursAvailableCopy);
// 		setHourBook(fromStringToNumber);
// 		setHourBook(fromStringToNumber);
// 	}, [newBook, listHoursAvalable, listBook, dayCurrent]);

// 	return { bookingAvailable: listHoursAvalable, hourBook: hourBook };
// };
