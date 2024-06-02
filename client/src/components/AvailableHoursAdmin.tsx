import { useEffect, useState } from 'react';
import { formatDate } from '../utils/formateDate';
import { listBookDays, listHoursAvalable } from '../utils/constants';
import { Booking, ListBook, ModalData, typeNewBook } from '../utils/interfaces';
import { useFilterAvailableHoursAdmin } from '../hook/HookFilterAvalableHoursAdmin';
import ModalBookEdit from './ModalBookEdit';
import ModalBook from './ModalBook';

interface Props {
	dateCurrent: string;
	listBooks: ListBook[] | undefined;
}

export default function AvailableHoursAdmin({
	dateCurrent,
	listBooks,
}: Props): JSX.Element {
	// const localStorage = new LocalStorageHelper();
	const dayCurrent = formatDate(dateCurrent);

	const [showModalBook, setShowModalBook] = useState<ModalData>({
		open: false,
		hour: '',
		day: '',
		status: '',
		index: 0,
		name: '',
		start: '',
	});
	const [showModalEdit, setShowModalEdit] = useState<ModalData>({
		open: false,
		hour: '',
		day: '',
		status: '',
		index: 0,
		name: '',
		start: '',
	});

	const [getBook, setGetBook] = useState<Array<typeNewBook>>([
		{ services: '', type: '', time: '', hourBook: '', name: '' },
	]);
	// const [selectedHours, setSelectedHours] = useState<Array<Booking>>();

	const [newListBooks, setNewListBooks] = useState<ListBook[] | undefined>(
		listBooks
	);

	const { bookingAvailable } = useFilterAvailableHoursAdmin(
		getBook as typeNewBook[],
		listHoursAvalable,
		newListBooks
	);

	const handlerSelected = (book: Booking, index: number) => {
		if (book.status === 'occupato') {
			setShowModalEdit({
				open: !showModalEdit.open,
				hour: book.hourBook,
				day: dayCurrent,
				status: book.status,
				index: index,
				name: book.name,
				start: book.start,
			});
		} else {
			setShowModalBook({
				open: !showModalBook.open,
				hour: book.hourBook,
				day: dayCurrent,
				status: book.status,
				index: index,
				start: book.start,
			});
		}
	};

	useEffect(() => {
		// setSelectedHours(bookingAvailable);
		setNewListBooks(listBooks);
	}, [bookingAvailable, listBooks, newListBooks]);

	return (
		<div className="w-full flex flex-row justify-center px-3">
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
					{bookingAvailable?.map((book: Booking, i: number) => {
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
					// setSelectedHours={setSelectedHours}
					// bookingAvailable={selectedHours as Booking[]}
					newListBooks={newListBooks}
					setNewListBooks={setNewListBooks}
					setGetBook={setGetBook}
					listBooks={listBooks}
					dateCurrent={dayCurrent}
				/>
			)}

			{showModalEdit.open && (
				<ModalBookEdit
					showModal={showModalEdit}
					setShowModal={setShowModalEdit}
					// setSelectedHours={setSelectedHours}
					// bookingAvailable={selectedHours as Booking[]}
					setGetBook={setGetBook}
					listBooks={listBookDays}
					dateCurrent={dayCurrent}
				/>
			)}
		</div>
	);
}
