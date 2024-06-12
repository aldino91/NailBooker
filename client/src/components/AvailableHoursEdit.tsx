import { useEffect, useState } from 'react';
import { ListBook } from '../utils/interfaces';
import { fromDateToTimeStamp } from '../utils/fromDateToTimeStamp';
import { listHoursAvalable } from '../utils/constants';
import { filterHoursAvailable } from '../utils/filterHoursAvailable';
import { sumHours } from '../utils/sumHours';
import { arrayServices } from '../utils/arrayServices';
import { fromStringToNum } from '../utils/fromStringToNum';
import { controlDisableButton } from '../utils/controlDisableButton';
import { DataEditBook } from './ModalBookEdit';

interface Props {
	dateCurrent: Date;
	listBooks: ListBook[] | undefined;
	bookSelected: ListBook;
	selectedServices: Array<{ [key: string]: string }>;
	setEditBookData: (data: DataEditBook) => void;
}

export default function AvailableHoursEdit({
	dateCurrent,
	listBooks,
	bookSelected,
	selectedServices,
	setEditBookData,
}: Props): JSX.Element {
	const [bookAvalable, setBookAvalable] = useState<ListBook[] | undefined>(
		undefined
	);

	const [disableButton, setDisableButton] = useState(false);

	const { dayString } = fromDateToTimeStamp(dateCurrent);

	useEffect(() => {
		const listHoursAvailableCopy: ListBook[] = JSON.parse(
			JSON.stringify(listHoursAvalable)
		);

		const listFilterBooks = filterHoursAvailable(
			listBooks,
			listHoursAvailableCopy
		);

		setBookAvalable(listFilterBooks);

		setDisableButton(false);
	}, [listBooks, dateCurrent]);

	const handlerSelected = (book: ListBook) => {
		if (bookAvalable) {
			if (book.status === 'selected') {
				setDisableButton(!disableButton);

				for (let i = 0; i < bookAvalable?.length; i++) {
					if (bookAvalable[i].start === book.hourBook) {
						bookAvalable[i] = {
							available: true,
							duration: '00:00',
							hourBook: bookAvalable[i].hourBook,
							services: [],
							reservarName: '',
							status: 'disponible',
							time: '00:30',
							id: '',
							start: '',
						};
						setBookAvalable([...bookAvalable]);
					}
				}
			}

			if (book.status === 'disponible') {
				setDisableButton(!disableButton);
				const sumDuration = sumHours(selectedServices);
				setEditBookData({ duration: sumDuration, hourBook: book.hourBook });
				for (let i = 0; i < bookAvalable?.length; i++) {
					const durationBook = fromStringToNum(sumDuration);
					if (bookAvalable[i].hourBook === book.hourBook) {
						bookAvalable[i] = {
							available: false,
							duration: sumDuration,
							hourBook: book.hourBook,
							services: arrayServices(selectedServices),
							reservarName: bookSelected.reservarName,
							status: 'selected',
							time: '00:30',
							id: bookSelected.id,
							start: book.hourBook,
						};

						for (
							let j = i + 1;
							j < i + durationBook && j < bookAvalable?.length;
							j++
						) {
							bookAvalable[j] = {
								available: false,
								duration: sumDuration,
								hourBook: bookAvalable[j].hourBook,
								services: arrayServices(selectedServices),
								reservarName: bookSelected.reservarName,
								status: 'selected',
								time: '00:30',
								id: bookSelected.id,
								start: book.hourBook,
							};
						}
						setBookAvalable([...bookAvalable]);
					}
				}
			}
		}
	};

	return (
		<div className="w-full flex flex-row justify-center px-3 ">
			<div className="w-full rounded-3xl box-shadow px-3 flex flex-col space-y-3 py-3">
				<div className="w-full flex flex-row space-x-3">
					<div>
						<text className="font-semibold">Orari disponibili: </text>
					</div>
					<div>
						<text className="font-semibold">{dayString}</text>
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					{bookAvalable?.map((book, i) => {
						return (
							<button
								key={i}
								disabled={controlDisableButton(disableButton, book.status)}
								className={`border border-gray-200 rounded-3xl py-2 px-2 box-shadow mr-2 text-center cursor-pointer ${
									book.id === bookSelected.id
										? 'bg-green-400 text-white'
										: book.status === 'occupato'
										? 'bg-gray-400 text-white'
										: book.status === 'selected'
										? `bg-green-400 text-white`
										: book.status === 'non basta il tempo'
										? 'bg-rose-400 text-white'
										: 'bg-white text-black'
								}`}
								onClick={() => handlerSelected(book)}
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
