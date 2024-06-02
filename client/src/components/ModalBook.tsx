import { ChangeEvent, useEffect, useState } from 'react';
import { Booking, ListBook, ModalData, typeNewBook } from '../utils/interfaces';
import SegmentService from './SegmentService';
import ListServicesManicure from './ListServicesManicure';
import ListServicesPedicure from './ListServicesPedicure';
import ListServicesSelected from './ListServicesSelected';
import { sumHours } from '../utils/sumHours';
import { fromStringToNum } from '../utils/fromStringToNum';
import HeaderInfoModalBook from './HeaderInfoModalBook';
import ButtonClose from './ButtonClose';

interface Props {
	showModal: ModalData;
	setShowModal: (arg: ModalData) => void;
	// setSelectedHours: (arg: Booking[]) => void;
	// bookingAvailable: Booking[];
	newListBooks: ListBook[] | undefined;
	setNewListBooks: (book: ListBook[]) => void;
	setGetBook: (book: typeNewBook[]) => void;
	listBooks: ListBook[] | undefined;
	dateCurrent: string;
}

export default function ModalBook({
	showModal,
	setShowModal,
	// setSelectedHours,
	// bookingAvailable,
	newListBooks,
	setNewListBooks,
	setGetBook,
	listBooks,
	dateCurrent,
}: Props): JSX.Element {
	const [services, setServices] = useState<string>('Manicure');
	const [selectedServices, setSelectedServices] = useState<Array<typeNewBook>>(
		[]
	);

	const [formData, setFormData] = useState({
		name: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// const filterDayAvailable = listBooks.find((date) => date.day === dateCurrent);
	// const listBookDayCurrent = filterDayAvailable?.book;

	const handlerSave = () => {
		const sumHoursNewBook = sumHours(selectedServices);

		const fromStringToNumber = fromStringToNum(sumHoursNewBook);

		let sumServices = [];

		if (newListBooks !== undefined) {
			for (let i = 0; i < selectedServices.length; i++) {
				sumServices.push(selectedServices[i].services);
			}

			newListBooks?.push({
				hourBook: showModal?.hour!,
				name: formData.name,
				services: sumServices as string[],
				duration: sumHoursNewBook,
				type: 'manicure',
			});
			setNewListBooks([...newListBooks]);
			setShowModal({ open: !showModal.open });
		}

		// if (showModal.status === 'disponible') {
		// 	bookingAvailable[showModal.index!].status = 'occupato';
		// 	bookingAvailable[showModal.index!].hourBook = showModal.hour!;
		// 	bookingAvailable[showModal.index!].available = false;
		// 	bookingAvailable[showModal.index!].name = formData.name;
		// 	bookingAvailable[showModal.index!].duration = sumHoursNewBook;

		// 	for (
		// 		let j = showModal.index!;
		// 		j < showModal.index! + fromStringToNumber &&
		// 		j < bookingAvailable.length;
		// 		j++
		// 	) {
		// 		bookingAvailable[j].status = 'occupato';
		// 		bookingAvailable[j].available = false;
		// 		bookingAvailable[j].name = formData.name;
		// 	}
		// 	setSelectedHours(bookingAvailable);
		// 	setShowModal({ open: !showModal.open });
		// 	setGetBook(selectedServices);
		// 	setSelectedServices([]);
		// }
	};

	// useEffect(() => {
	// 	console.log('listBooks', listBooks);
	// }, [listBooks]);

	return (
		<div
			className={`h-full absolute top-0 left-0 z-40 ${
				showModal.open
					? 'animate-slideInUp w-full'
					: 'animate-slideOutDown w-full'
			}`}
		>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll inset-0 fixed outline-none focus:outline-none w-full h-full bg-modal">
				<div className="w-full lg:w-1/2 mx-auto h-full lg:h-3/4">
					<div className="border rounded-lg shadow-lg relative flex flex-col justify-between space-y-4 w-full bg-white outline-none focus:outline-none border-blueGray-200 h-full overflow-y-auto">
						<ButtonClose
							setClose={() => setShowModal({ open: !showModal.open })}
						/>

						<HeaderInfoModalBook data={showModal} />

						<div className="flex flex-col lg:space-y-7 px-2 pt-2 order-2 h-4/6">
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
						<form className="w-full px-2 order-3">
							<div className=" flex flex-col space-y-1 w-full">
								<div>
									<label className="font-semibold text-gray-500">Nome</label>
								</div>
								<div className="w-full">
									<input
										type="text"
										name="name"
										className="p-2 border-2 border-gray-300 rounded-lg w-full"
										value={formData.name}
										onChange={handleChange}
									/>
								</div>
							</div>
						</form>

						<div className="w-full px-2 py-4 rounded-b order-last">
							<button
								className="bg-emerald-500 text-white active:bg-emerald-600 w-full font-bold text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
								type="button"
								onClick={() => handlerSave()}
							>
								Salva
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
