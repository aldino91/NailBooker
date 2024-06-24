import { ChangeEvent, useState } from 'react';
import SegmentService from '../../components/SegmentService';

import ListServicesSelected from './ListServicesSelected';
import { sumHours } from '../../utils/sumHours';
import HeaderInfoModalBook from './HeaderInfoModalBook';
import ButtonClose from '../../components/ButtonClose';
import { DataCreatedBook } from '../../api/fetchCreatedBooking';
import LocalStorageHelper from '../../utils/localStorage';
import LoadingSpinner from './LoadingSpinner';
import { sumListServices } from '../../utils/sumListServices';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';
import ListServicesManicure from './ListServicesManicure';
import ListServicesPedicure from './ListServicesPedicure';
import useToast from '../../hook/HookToast';
import { conditionChangeListDaysBooks } from '../../utils/conditionChangeListDaysBooks';
import { fromStringToNum } from '../../utils/fromStringToNum';

interface Props {
	showModal: boolean;
	setShowModal: (arg: boolean) => void;
}

export default function ModalBook({
	showModal,
	setShowModal,
}: Props): JSX.Element {
	const { notify } = useToast();

	const localStorageId = new LocalStorageHelper<string>();

	const { fetchCreatedBook, bookSelected, listBookDays } =
		useReservationStore();

	const [services, setServices] = useState<string>('Manicure');

	const [selectedServices, setSelectedServices] = useState<
		Array<{ [key: string]: string }>
	>([]);

	const [formData, setFormData] = useState({
		name: '',
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const createdBook: DataCreatedBook = {
		hourBook: bookSelected?.hourBook!,
		reservarName: formData.name,
		services: sumListServices(selectedServices),
		duration: sumHours(selectedServices),
		dayBook: bookSelected?.dayBook!,
		usersId: localStorageId.load('userId')!,
	};

	const handlerSave = async () => {
		const durationBook = fromStringToNum(sumHours(selectedServices));

		if (listBookDays && bookSelected?.dayBook) {
			const index = listBookDays.findIndex(
				(day) => day.hourBook === bookSelected?.hourBook
			);
			const condicion = conditionChangeListDaysBooks({
				index,
				durationBook,
				listBookDays,
				bookSelected,
			});

			if (condicion) {
				try {
					setLoading(true);

					await fetchCreatedBook(createdBook);

					notify('Prenotazione creata correttamente 🙌🏻 ✅', 'success');

					setLoading(false);

					setShowModal(!showModal);
				} catch (error) {
					console.log('Error Created book: ', error);

					notify('Non siamo riuscite a creare la prenotazione ❌', 'error');

					setLoading(false);

					setShowModal(!showModal);
				}
			} else {
				notify('Tempo non sufficiente per i servizzi scelti ⌛️', 'warn');
			}
		}
	};

	return (
		<div
			className={`h-full absolute top-0 left-0 z-40 ${
				showModal ? 'animate-slideInUp w-full' : 'animate-slideOutDown w-full'
			}`}
		>
			<div className="justify-center items-center flex overflow-x-hidden overflow-y-scroll inset-0 fixed outline-none focus:outline-none w-full h-full bg-modal">
				<div className="w-full lg:w-1/2 mx-auto h-full lg:h-3/4">
					<div className="border rounded-lg shadow-lg relative flex flex-col justify-between space-y-4 w-full bg-white outline-none focus:outline-none border-blueGray-200 h-full overflow-y-auto">
						<ButtonClose setClose={() => setShowModal(!showModal)} />

						<HeaderInfoModalBook />

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
