import { ChangeEvent, useState } from 'react';
import { Booking, ListBook, ModalData, typeNewBook } from '../utils/interfaces';
import SegmentService from './SegmentService';
import ListServicesManicure from './ListServicesManicure';
import ListServicesPedicure from './ListServicesPedicure';
import ListServicesSelected from './ListServicesSelected';
import { sumHours } from '../utils/sumHours';
import { fromStringToNum } from '../utils/fromStringToNum';
import HeaderInfoModalBook from './HeaderInfoModalBook';
import ButtonClose from './ButtonClose';
import { DataCreated, fetchCreatedBookings } from '../api/fetchCreatedBooking';
import LocalStorageHelper from '../utils/localStorage';
import LoadingSpinner from './LoadingSpinner';
import { sumListServices } from '../utils/sumListServices';
import { createdBooking } from '../utils/createdBooking';

interface Props {
	showModal: ModalData;
	setShowModal: (arg: ModalData) => void;
	bookAvalable: ListBook[] | undefined;
	setBookAvalable: (arg: ListBook[]) => void;
	refreshGet: boolean;
	setRefreshGet: (arg: boolean) => void;
}

export default function ModalBook({
	showModal,
	setShowModal,
	bookAvalable,
	setBookAvalable,
	refreshGet,
	setRefreshGet,
}: Props): JSX.Element {
	const localStorageId = new LocalStorageHelper<string>();
	const [services, setServices] = useState<string>('Manicure');
	const [selectedServices, setSelectedServices] = useState<
		Array<{ [key: string]: string }>
	>([]);

	const [formData, setFormData] = useState({
		name: '',
	});
	const createdBook: DataCreated = {
		hourBook: showModal?.hour!,
		reservarName: formData.name,
		services: sumListServices(selectedServices),
		duration: sumHours(selectedServices),
		dayBook: showModal?.day!,
		usersId: localStorageId.load('userId')!,
	};

	const [loading, setLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handlerSave = async () => {
		try {
			setLoading(true);

			const response = await fetchCreatedBookings(createdBook);

			const id = response?.data.data.id;

			const dataAddList = {
				hourBook: showModal?.hour!,
				reservarName: formData.name,
				services: sumListServices(selectedServices),
				duration: sumHours(selectedServices),
				dayBook: showModal?.day!,
				usersId: localStorageId.load('userId')!,
				available: false,
				status: 'occupato',
				time: '00:00',
				id: id,
			};
			const addBooking: ListBook[] = await createdBooking({
				dataAddList,
				bookAvalable,
				showModal,
				name: formData.name,
				id,
				usersId: localStorageId.load('userId')!,
				selectedServices,
			});
			setBookAvalable([...addBooking!]);
			setRefreshGet(!refreshGet);
			setLoading(false);
			setShowModal({ open: !showModal.open });
		} catch (error) {
			console.log('Error Created book: ', error);
			setLoading(false);
			setShowModal({ open: !showModal.open });
		}
	};

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
								disabled={loading ? true : false}
								className="flex flex-row justify-center bg-emerald-500 text-white active:bg-emerald-600 w-full font-bold text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
								type="button"
								onClick={() => handlerSave()}
							>
								{!loading ? 'Salva' : <LoadingSpinner />}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
