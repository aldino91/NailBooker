import { useState } from 'react';
import {
	Booking,
	ListBookDays,
	ModalData,
	typeNewBook,
} from '../utils/interfaces';
import SegmentService from './SegmentService';
import ListServicesManicure from './ListServicesManicure';
import ListServicesPedicure from './ListServicesPedicure';
import ListServicesSelected from './ListServicesSelected';
import { sumHours } from '../utils/sumHours';
import { fromStringToNum } from '../utils/fromStringToNum';
import FormCalendar from './FormCalendar';
import ButtonClose from './ButtonClose';
import HeaderInfoModalEdit from './HeaderInfoModalEdit';
import ButtonFooterModalEdit from './ButtonFooterModalEdit';
import AvailableHours from './AvailableHours';

interface Props {
	showModal: ModalData;
	setShowModal: (arg: ModalData) => void;
	// setSelectedHours: (arg: Booking[]) => void;
	// bookingAvailable: Booking[];
	setGetBook: (book: typeNewBook[]) => void;
	listBooks: ListBookDays[];
	dateCurrent: string;
}

export default function ModalBookEdit({
	showModal,
	setShowModal,
	// setSelectedHours,
	// bookingAvailable,
	setGetBook,
	listBooks,
	dateCurrent,
}: Props): JSX.Element {
	const [showEditBook, setShowEditBook] = useState(false);
	const [startDate, setStartDate] = useState<Date | string>(new Date());
	const [services, setServices] = useState<string>('Manicure');
	const [selectedServices, setSelectedServices] = useState<Array<typeNewBook>>(
		[]
	);
	const [bookSelected, setBookSelected] = useState(true);

	const handlerDelete = () => {
		// const filterDayAvailable = listBooks.find(
		// 	(date) => date.day === dateCurrent
		// );
		// const listBookDayCurrent = filterDayAvailable?.book;

		// const filterBookingDelete = bookingAvailable.filter(
		// 	(book) => book.start === showModal.start
		// );

		// const index = bookingAvailable.findIndex(
		// 	(element) => element.hourBook === filterBookingDelete[0].hourBook
		// );

		// if (listBookDayCurrent) {
		// 	for (let i = 0; i < listBookDayCurrent?.length; i++) {
		// 		bookingAvailable[index] = {
		// 			available: false,
		// 			hourBook: '',
		// 			name: '',
		// 			start: '',
		// 			status: 'disponible',
		// 			time: '00:30',
		// 		};

		// 		listBookDayCurrent.splice(i, 1);
		// 		setSelectedHours([...bookingAvailable]);
		// 	}
		// }
		setShowModal({ open: !showModal.open });
		// console.log(
		// 	'listBookDayCurrent: ',
		// 	listBookDayCurrent,
		// 	'filterBookingDelete: ',
		// 	filterBookingDelete
		// );

		// if (listBookDayCurrent) {
		// 	for (let i = 0; i < listBookDayCurrent.length; i++) {
		// 		for (let j = 0; j < filterBookingDelete.length; j++) {
		// 			if (
		// 				bookingAvailable[i].hourBook === filterBookingDelete[j].hourBook
		// 			) {
		// 				bookingAvailable[i] = {
		// 					hourBook: filterBookingDelete[j].hourBook,
		// 					time: '00:30',
		// 					available: true,
		// 					status: 'disponible',
		// 					name: '',
		// 					start: '',
		// 				};
		// 			}
		// 		}
		// 	}
		// 	setSelectedHours([...bookingAvailable]);
		// }
	};

	const handlerSave = () => {
		const sumHoursNewBook = sumHours(selectedServices);
		const fromStringToNumber = fromStringToNum(sumHoursNewBook);
		// if (showModal.status === 'selected') {
		// 	bookingAvailable[showModal.index!].status = 'occupato';
		// 	for (
		// 		let j = showModal.index!;
		// 		j < showModal.index! + fromStringToNumber &&
		// 		j < bookingAvailable.length;
		// 		j++
		// 	) {
		// 		bookingAvailable[j].status = 'occupato';
		// 	}

		// 	setShowModal({ open: !showModal.open });
		// 	setSelectedHours([...bookingAvailable]);
		// 	setGetBook(selectedServices);
		// } else if (showModal.status === 'disponible') {
		// 	bookingAvailable[showModal.index!].status = 'occupato';
		// 	bookingAvailable[showModal.index!].hourBook = showModal.hour!;

		// 	for (
		// 		let j = showModal.index!;
		// 		j < showModal.index! + fromStringToNumber &&
		// 		j < bookingAvailable.length;
		// 		j++
		// 	) {
		// 		bookingAvailable[j].status = 'occupato';
		// 	}
		// 	setSelectedHours([...bookingAvailable]);
		// 	setGetBook(selectedServices);
		// 	setSelectedServices([]);
		// 	setShowModal({ open: !showModal.open });
		// }
	};

	return (
		<div
			className={`h-full absolute top-0 left-0 z-40 ${
				showModal.open
					? 'animate-slideInUp w-full'
					: 'animate-slideOutDown w-full'
			}`}
		>
			<div className="justify-center items-center flex overflow-x-hidden inset-0 fixed outline-none focus:outline-none w-full h-full bg-modal">
				<div className="w-full lg:w-1/2 mx-auto h-full flex flex-col justify-center">
					{/*content*/}
					<div
						className={`rounded-lg shadow-lg relative flex flex-col justify-between space-y-4 w-full bg-white outline-none focus:outline-none border-blueGray-200 h-full overflow-y-scroll  border expandable ${
							showEditBook ? 'expanded' : ''
						} `}
					>
						<ButtonClose
							setClose={() => setShowModal({ open: !showModal.open })}
						/>
						{/*header*/}
						<HeaderInfoModalEdit
							close={showEditBook}
							setClose={setShowEditBook}
							data={showModal}
						/>

						<div
							className={`${
								showEditBook
									? 'animate-slideInUp w-full flex flex-col space-y-4'
									: 'hidden'
							}`}
						>
							<div className="">
								<FormCalendar
									startDate={startDate}
									setStartDate={setStartDate}
								/>
							</div>

							{/*body*/}
							<div className="flex flex-col lg:space-y-7 px-2 pt-4 ">
								<SegmentService services={services} setServices={setServices} />
								<ListServicesSelected
									selectedServices={selectedServices}
									setSelectedServices={setSelectedServices}
								/>

								<div className="font-base text-gray-500">
									<text>Durata prenotazione: {sumHours(selectedServices)}</text>
								</div>
								<div className="w-full p-2">
									<div className="font-medium">
										<h2>{services}</h2>
									</div>

									{services === 'Manicure' && (
										<ListServicesManicure
											selectedServices={selectedServices}
											setSelectedServices={setSelectedServices}
										/>
									)}

									{services === 'Pedicure' && (
										<ListServicesPedicure
											selectedServices={selectedServices}
											setSelectedServices={setSelectedServices}
										/>
									)}
								</div>
							</div>
							<div className="">
								<AvailableHours
									dateCurrent={startDate as string}
									setBookSelected={setBookSelected}
								/>
							</div>
							<form className="w-full px-2">
								<div className=" flex flex-col space-y-1 w-full">
									<div>
										<label className="font-semibold text-gray-500">Nome</label>
									</div>
									<div className="w-full">
										<input
											type="text"
											name="name"
											className="p-2 border-2 border-gray-300 rounded-lg w-full"
											// value={formData.name}
											// onChange={handleChange}
										/>
									</div>
								</div>
							</form>
						</div>

						<ButtonFooterModalEdit
							handlerSave={handlerSave}
							handlerDelete={handlerDelete}
							showEditBook={showEditBook}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
