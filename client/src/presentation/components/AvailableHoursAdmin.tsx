import { useEffect, useState } from 'react';
import { Books } from '../../domain/entities/Books';
import { fromDateToTimeStamp } from '../../utils/fromDateToTimeStamp';
import ModalBook from './ModalBook';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';
import { dateFromTo } from '../../utils/dateFromTo';
import { useNavigate } from 'react-router-dom';
import { Services } from './BodyEditBook';
import LocalStorageHelper from '../../utils/localStorage';
import { searchServicesForEdit } from '../../utils/searchServicesForEdit';

interface Props {
	dateCurrent: Date;
	dateSelected: Date;
}

export default function AvailableHoursAdmin({
	dateCurrent,
	dateSelected,
}: Props): JSX.Element {
	const navigate = useNavigate();

	const localStorage = new LocalStorageHelper<Services[] | Books | undefined>();

	const { listBookDays, filterBooksByDate, listBooks, setBookSelected } =
		useReservationStore();

	const { dayString } = fromDateToTimeStamp(dateCurrent);

	const [showModalBook, setShowModalBook] = useState<boolean>(false);

	const handlerSelected = (book: Books) => {
		if (book.status === 'occupato') {
			setBookSelected(book);
			localStorage.save('services', searchServicesForEdit(book.services!));
			localStorage.save('bookSelected', book);
			navigate('/edit-book');
			// setShowModalEdit(!showModalEdit);
		} else {
			const { dateCurrent } = dateFromTo(dateSelected);
			book.dayBook = dateCurrent;
			setBookSelected(book);
			setShowModalBook(!showModalBook);
		}
	};

	useEffect(() => {
		filterBooksByDate(dateSelected);
	}, [dateSelected, listBooks]);

	return (
		<div className="w-full flex flex-row justify-center px-3">
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
									book.status === 'occupato'
										? 'bg-gray-400 text-white hover:bg-gray-300'
										: book.status === 'selected'
										? `bg-green-400 text-white hover:bg-green-300`
										: book.status === 'non basta il tempo'
										? 'bg-rose-400 text-white hover:bg-rose-300'
										: 'bg-white text-black hover:bg-gray-300'
								}`}
								onClick={() => handlerSelected(book)}
							>
								{book.hourBook}
							</button>
						);
					})}
				</div>
			</div>
			{showModalBook && (
				<ModalBook showModal={showModalBook} setShowModal={setShowModalBook} />
			)}

			{/* {showModalEdit && <ModalBookEdit />} */}
		</div>
	);
}
