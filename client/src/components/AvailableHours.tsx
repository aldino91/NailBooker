import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formateDate';
import LocalStorageHelper from '../utils/localStorage';
import { listBookDays, listHoursAvalable } from '../utils/constants';
import { useFilterAvalableHours } from '../hook/HookFilterAvalableHours';
import { Booking, typeNewBook } from '../utils/interfaces';

interface Props {
	dateCurrent: string;
	setBookSelected: (x: boolean) => void;
}

export default function AvailableHours({
	dateCurrent,
	setBookSelected,
}: Props): JSX.Element {
	const localStorage = new LocalStorageHelper();
	const dayCurrent = formatDate(dateCurrent);

	const [getBook, setGetBook] = useState<typeNewBook[]>([
		{ services: '', type: '', time: '', hourBook: '' },
	]);

	const { bookingAvailable, hourBook } = useFilterAvalableHours(
		getBook as typeNewBook[],
		listHoursAvalable,
		listBookDays,
		dateCurrent
	);

	const [selectedHours, setSelectedHours] =
		useState<Array<Booking>>(bookingAvailable);

	const handlerSelected = (book: Booking, index: number) => {
		if (book.status === 'selected') {
			bookingAvailable[index].status = 'disponible';
			for (let i = index; i < bookingAvailable.length - 1; i++) {
				bookingAvailable[i + 1].status = 'disponible';
			}

			setSelectedHours([...bookingAvailable]);
			setBookSelected(true);
		} else if (book.status === 'disponible') {
			bookingAvailable[index].status = 'selected';
			for (
				let i = index;
				i < index + hourBook - 1 && i + 1 < bookingAvailable.length;
				i++
			) {
				bookingAvailable[i + 1].status = 'occupato';
			}

			setSelectedHours([...bookingAvailable]);

			setBookSelected(false);
		}
	};

	useEffect(() => {
		setSelectedHours(bookingAvailable);

		const getLocalStorage: typeNewBook[] | unknown = localStorage.load('book');
		if (getLocalStorage === null) {
			const data = [
				{
					services: '',
					type: '',
					time: '',
					bookingTime: '',
					name: '',
				},
			];
			setGetBook(data);
		} else {
			setGetBook(getLocalStorage as typeNewBook[]);
		}
	}, [bookingAvailable, selectedHours]);

	return (
		<div className="w-full flex flex-row justify-center px-3 ">
			<div className="w-full rounded-3xl box-shadow px-3 flex flex-col space-y-3 py-3">
				<div className="w-full flex flex-row space-x-3">
					<div>
						<text className=" font-semibold">Orari disponibili: </text>
					</div>
					<div>
						<text className=" font-semibold">{dayCurrent}</text>
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					{selectedHours.map((book, i) => {
						return (
							<button
								key={i}
								disabled={book.available === false ? true : false}
								className={`border border-gray-200 rounded-3xl py-2 px-2 box-shadow mr-2 text-center cursor-pointer ${
									book.status === 'occupato'
										? 'bg-gray-400 text-white'
										: book.status === 'selected'
										? `bg-green-400 text-white`
										: book.status === 'non basta il tempo'
										? 'bg-rose-400 text-white'
										: 'bg-white text-black'
								}`}
								onClick={() => handlerSelected(book, i)}
							>
								{book.hourBook}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
