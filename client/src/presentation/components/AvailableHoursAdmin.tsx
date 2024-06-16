import { useEffect, useState } from 'react';
import { Books } from '../../domain/entities/Books';
import { ModalData } from '../../utils/interfaces';
import { fromDateToTimeStamp } from '../../utils/fromDateToTimeStamp';
import ModalBook from '../../components/ModalBook';
import ModalBookEdit from '../../components/ModalBookEdit';

import { useReservationStore } from '../../infrastructure/store/reservationsStore';

interface Props {
	dateCurrent: Date;
	dateSelected: Date;
}

export default function AvailableHoursAdmin({
	dateCurrent,
	dateSelected,
}: Props): JSX.Element {
	const { listBookDays, filterBooksByDate } = useReservationStore();

	const [bookAvalable, setBookAvalable] = useState<Books[] | undefined>(
		undefined
	);

	const [bookSelected, setBookSelected] = useState<Books>();

	const { timeStamp, dayString } = fromDateToTimeStamp(dateCurrent);

	const [showModalBook, setShowModalBook] = useState<ModalData>({
		open: false,
		hour: '',
		day: 0,
		status: '',
		index: 0,
		name: '',
		start: '',
		id: '',
	});
	const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

	const handlerSelected = (book: Books, index: number) => {
		if (book.status === 'occupato') {
			setShowModalEdit(!showModalEdit);

			setBookSelected(book);
		} else {
			setShowModalBook({
				open: !showModalBook.open,
				hour: book.hourBook,
				day: timeStamp,
				status: book.status,
				index: index,
				start: book.start,
				id: book.id,
			});
		}
	};

	useEffect(() => {
		filterBooksByDate(dateSelected);
	}, [dateSelected]);

	return (
		<div className="w-full flex flex-row justify-center px-3">
			<div className="w-full rounded-3xl box-shadow px-3 flex flex-col space-y-3 py-3">
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
								// disabled={book.available === false ? true : false}
								className={`border border-gray-200 rounded-3xl py-2 px-2 box-shadow mr-2 text-center cursor-pointer ${
									book.status === 'occupato'
										? 'bg-gray-400 text-white hover:bg-gray-300'
										: book.status === 'selected'
										? `bg-green-400 text-white hover:bg-green-300`
										: book.status === 'non basta il tempo'
										? 'bg-rose-400 text-white hover:bg-rose-300'
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
			{showModalBook.open && (
				<ModalBook
					showModal={showModalBook}
					setShowModal={setShowModalBook}
					bookAvalable={bookAvalable}
					setBookAvalable={setBookAvalable}
				/>
			)}

			{showModalEdit && (
				<ModalBookEdit
					showModal={showModalEdit}
					setShowModal={setShowModalEdit}
					dayCurrent={dateCurrent}
				/>
			)}
		</div>
	);
}
