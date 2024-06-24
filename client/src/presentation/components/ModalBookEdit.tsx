import { ChangeEvent, useState } from 'react';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';
import { fromDateToTimeStamp } from '../../utils/fromDateToTimeStamp';
import { searchServicesForEdit } from '../../utils/searchServicesForEdit';
import { Books } from '../../domain/entities/Books';
import { dateFromTo } from '../../utils/dateFromTo';
import { DataUpdate } from '../../api/fetchUpdateBook';
import { arrayServices } from '../../utils/arrayServices';
import { sumHours } from '../../utils/sumHours';
import ButtonClose from '../../components/ButtonClose';
import FormCalendar from './FormCalendar';
import SegmentService from '../../components/SegmentService';
import ListServicesSelected from './ListServicesSelected';
import AvailableHoursEdit from './AvailableHoursEdit';
import HeaderInfoModalEdit from './HeaderInfoModalEdit';
import ListServicesManicure from './ListServicesManicure';
import ListServicesPedicure from './ListServicesPedicure';
import ButtonFooterModalEdit from './ButtonFooterModalEdit';
import LocalStorageHelper from '../../utils/localStorage';
import useToast from '../../hook/HookToast';

interface Props {
	showModal: boolean;
	setShowModal: (arg: boolean) => void;
}

export interface DataEditBook {
	duration: string;
	hourBook: string;
}

export default function ModalBookEdit({
	showModal,
	setShowModal,
}: Props): JSX.Element {
	const localStorage = new LocalStorageHelper();

	const { notify } = useToast();
	const {
		dateSelected,
		setBookSelected,
		weekCurrent,
		fetchBookUpdate,
		bookSelected,
		deleteBook,
	} = useReservationStore();

	const { timeStamp } = fromDateToTimeStamp(
		new Date(dateSelected.toISOString())
	);

	const [showEditBook, setShowEditBook] = useState(false);

	const [showLoadingDelete, setShowLoadingDelete] = useState(false);

	const [showLoadingUpdate, setShowLoadingUpdate] = useState(false);

	const [services, setServices] = useState<string>('Manicure');

	const [selectedServices, setSelectedServices] = useState<
		Array<{ [key: string]: string }>
	>(searchServicesForEdit(bookSelected?.services!));

	const [editBookData, setEditBookData] = useState<Books>({
		...bookSelected!,
		dayBook: timeStamp,
	});

	const handlerDelete = () => {
		setShowLoadingDelete(true);
		deleteBook(bookSelected?.id!)
			.then(() => {
				setShowLoadingDelete(false);
				setShowModal(!showModal);
				notify('Prenotazione cancellata con successo ❎', 'success');
				localStorage.clear('PreviousListBook');
			})
			.catch((error) => {
				localStorage.clear('PreviousListBook');
				notify('Non é stato possibile cancellare la prenotazione ❌', 'error');
				console.log('ERROR FETCH: ', error);
			});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBookSelected({ ...bookSelected!, reservarName: value });
		setEditBookData({
			...editBookData,
			[name]: value,
		});
	};

	const { dateCurrent } = dateFromTo(dateSelected);

	const data: DataUpdate = {
		id: editBookData.id,
		reservarName: editBookData?.reservarName!,
		services: arrayServices(selectedServices),
		hourBook: bookSelected!.hourBook,
		duration: sumHours(selectedServices),
		dayBook: dateCurrent,
	};
	const handlerSave = async () => {
		try {
			setShowLoadingUpdate(true);

			await fetchBookUpdate(data);

			notify('Prenotazione aggiornata correttamente 👍🏻', 'success');

			localStorage.clear('PreviousListBook');

			setShowLoadingUpdate(false);

			setShowModal(!showModal);
		} catch (error) {
			setShowLoadingUpdate(false);
			notify('Non é estato possibile aggiornare la prenotazione 😵', 'error');
			localStorage.clear('PreviousListBook');
			setShowModal(!showModal);
			console.log('Error Update: ', error);
		}
	};

	return (
		<div
			className={`h-full absolute top-0 left-0 z-40 ${
				showModal ? 'animate-slideInUp w-full' : 'animate-slideOutDown w-full'
			}`}
		>
			<div className="justify-center items-center flex overflow-x-hidden inset-0 fixed outline-none focus:outline-none w-full h-full bg-modal">
				<div className="w-full lg:w-1/2 mx-auto h-full flex flex-col justify-center">
					<div
						className={`rounded-lg shadow-lg relative flex flex-col justify-between space-y-4 w-full bg-white outline-none focus:outline-none border-blueGray-200 h-full overflow-y-scroll expandable ${
							showEditBook ? 'expanded' : ''
						} `}
					>
						<ButtonClose setClose={() => setShowModal(!showModal)} />

						<HeaderInfoModalEdit
							close={showEditBook}
							setClose={setShowEditBook}
						/>

						<div
							className={`${
								showEditBook
									? 'animate-slideInUp w-full flex flex-col space-y-4'
									: 'hidden'
							}`}
						>
							<div className="">
								<FormCalendar weekCurrent={weekCurrent} />
							</div>

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
							<form className="w-full px-2">
								<div className=" flex flex-col space-y-1 w-full">
									<div>
										<label className="font-semibold text-gray-500">Nome</label>
									</div>
									<div className="w-full">
										<input
											type="text"
											name="reservarName"
											placeholder={bookSelected?.reservarName?.toLocaleUpperCase()}
											className="p-2 border-2 border-gray-300 rounded-lg w-full"
											value={editBookData.reservarName}
											onChange={handleChange}
										/>
									</div>
								</div>
							</form>
							<div className="">
								<AvailableHoursEdit
									dateCurrent={dateSelected}
									dateSelected={dateSelected}
									dataUpdate={data}
								/>
							</div>
						</div>

						<ButtonFooterModalEdit
							handlerSave={handlerSave}
							handlerDelete={handlerDelete}
							showEditBook={showEditBook}
							showLoadingDelete={showLoadingDelete}
							showLoadingUpdate={showLoadingUpdate}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
