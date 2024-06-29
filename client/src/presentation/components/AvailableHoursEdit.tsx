import { useEffect } from 'react';
import { Books } from '../../domain/entities/Books';
import { fromDateToTimeStamp } from '../../utils/fromDateToTimeStamp';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';
import { DataUpdate } from '../../api/fetchUpdateBook';
import { fromStringToNum } from '../../utils/fromStringToNum';
import { conditionChangeListDaysBooks } from '../../utils/conditionChangeListDaysBooks';
import useToast from '../../hook/HookToast';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
	dateCurrent: Date;
	dateSelected: Date;
	dataUpdate: DataUpdate;
}

export default function AvailableHoursEdit({
	dateCurrent,
	dateSelected,
	dataUpdate,
}: Props): JSX.Element {
	const {
		listBookDays,
		filterBooksByDate,
		listBooks,
		updateListBookDays,
		bookSelected,
	} = useReservationStore();

	const { notify } = useToast();

	const { dayString } = fromDateToTimeStamp(dateCurrent);

	const handlerSelected = (book: Books, index: number) => {
		const durationBook = fromStringToNum(dataUpdate.duration);

		if (listBookDays && bookSelected) {
			const condicion = conditionChangeListDaysBooks({
				index,
				durationBook,
				listBookDays,
				bookSelected,
			});

			if (condicion) {
				updateListBookDays(dataUpdate, book.hourBook);
			} else {
				if (book.id !== bookSelected.id && book.status === 'occupato') {
					notify('Orario non disponibile...', 'warn');
				} else {
					notify('Tempo non sufficiente per i servizzi scelti...', 'warn');
				}
			}
		}
	};

	useEffect(() => {
		filterBooksByDate(dateSelected);
	}, [dateSelected, listBooks]);
	return (
		<div className="w-full flex flex-row justify-center px-3 ">
			<div className="w-full rounded-3xl box-shadow px-3 flex flex-col space-y-3 py-3 bg-default">
				<div className="w-full flex flex-row space-x-3">
					<div>
						<text className=" font-semibold">Orari disponibili: </text>
					</div>
					<div>
						<text className=" font-semibold">{dayString}</text>
					</div>
				</div>

				<div className="grid grid-cols-4 gap-4">
					{listBookDays?.map((book: Books, i: number) => {
						return (
							<button
								key={i}
								className={`border border-gray-200 rounded-3xl py-2 px-2 box-shadow mr-2 text-center cursor-pointer ${
									book.id === bookSelected?.id
										? 'bg-red-400 opacity-70 text-white hover:bg-red-300'
										: book.status === 'occupato'
										? 'bg-gray-400 text-white'
										: 'bg-white text-black hover:bg-gray-300'
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
