import { useEffect, useState } from 'react';
import { listHoursAvalable } from '../utils/constants';
import { ListBook, ModalData } from '../utils/interfaces';
import ModalBookEdit from './ModalBookEdit';
import ModalBook from './ModalBook';
import { fromDateToTimeStamp } from '../utils/fromDateToTimeStamp';
import { filterHoursAvailable } from '../utils/filterHoursAvailable';

interface Props {
	dateCurrent: Date;
	listBooks: ListBook[] | undefined;
	refreshGet: boolean;
	setRefreshGet: (arg: boolean) => void;
}

export default function AvailableHoursAdmin({
	dateCurrent,
	listBooks,
	refreshGet,
	setRefreshGet,
}: Props): JSX.Element {
	const [bookAvalable, setBookAvalable] = useState<ListBook[] | undefined>(
		undefined
	);

	const [bookSelected, setBookSelected] = useState<ListBook>();

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

	const handlerSelected = (book: ListBook, index: number) => {
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
		const listHoursAvailableCopy: ListBook[] = JSON.parse(
			JSON.stringify(listHoursAvalable)
		);

		const listFilterBooks = filterHoursAvailable(
			listBooks,
			listHoursAvailableCopy
		);

		setBookAvalable(listFilterBooks);
	}, [listBooks, dateCurrent]);

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
					{bookAvalable?.map((book: ListBook, i: number) => {
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
					refreshGet={refreshGet}
					setRefreshGet={setRefreshGet}
				/>
			)}

			{showModalEdit && (
				<ModalBookEdit
					showModal={showModalEdit}
					setShowModal={setShowModalEdit}
					bookAvalable={bookAvalable}
					setBookAvalable={setBookAvalable}
					bookSelected={bookSelected as ListBook}
					dayCurrent={dateCurrent}
					refreshGet={refreshGet}
					setRefreshGet={setRefreshGet}
				/>
			)}
		</div>
	);
}
