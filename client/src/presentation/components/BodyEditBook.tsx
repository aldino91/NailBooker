import { ChangeEvent, useEffect, useState } from 'react';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';
import { fromDateToTimeStamp } from '../../utils/fromDateToTimeStamp';
import { Books } from '../../domain/entities/Books';
import { dateFromTo } from '../../utils/dateFromTo';
import { DataUpdate } from '../../api/fetchUpdateBook';
import { arrayServices } from '../../utils/arrayServices';
import { sumHours } from '../../utils/sumHours';
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
import { useNavigate } from 'react-router-dom';

export interface DataEditBook {
	duration: string;
	hourBook: string;
}

export interface Services {
	services: string;
	type: string;
	duration: string;
}

export default function BodyEditBook(): JSX.Element {
	const localStorage = new LocalStorageHelper<Services[]>();

	const { notify } = useToast();

	const navigate = useNavigate();

	const {
		dateSelected,
		setBookSelected,
		weekCurrent,
		fetchBookUpdate,
		bookSelected,
		deleteBook,
		fetchBooks,
	} = useReservationStore();

	const { timeStamp } = fromDateToTimeStamp(
		new Date(dateSelected.toISOString())
	);

	const [showEditBook, setShowEditBook] = useState(false);

	const [showLoadingDelete, setShowLoadingDelete] = useState(false);

	const [showLoadingUpdate, setShowLoadingUpdate] = useState(false);

	const [services, setServices] = useState<string>('Manicure');

	const [selectedServices, setSelectedServices] = useState<Services[]>();

	const [editBookData, setEditBookData] = useState<Books>({
		...bookSelected!,
		dayBook: timeStamp,
	});

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
		hourBook: bookSelected.hourBook,
		duration: sumHours(selectedServices),
		dayBook: dateCurrent,
	};

	const handlerDelete = () => {
		setShowLoadingDelete(true);
		deleteBook(bookSelected?.id!)
			.then(() => {
				setShowLoadingDelete(false);

				notify('Prenotazione cancellata con successo ❎', 'success');
				localStorage.clear('PreviousListBook');
				navigate('/dashboard-admin');
			})
			.catch((error) => {
				localStorage.clear('PreviousListBook');
				notify('Non é stato possibile cancellare la prenotazione ❌', 'error');
				console.log('ERROR FETCH: ', error);
			});
	};

	const handlerSave = async () => {
		try {
			setShowLoadingUpdate(true);

			await fetchBookUpdate(data);

			notify('Prenotazione aggiornata correttamente 👍🏻', 'success');

			localStorage.clear('PreviousListBook');

			localStorage.clear('bookSelected');

			localStorage.clear('services');

			setShowLoadingUpdate(false);

			navigate('/dashboard-admin');
		} catch (error) {
			setShowLoadingUpdate(false);

			notify('Non é estato possibile aggiornare la prenotazione 😵', 'error');

			localStorage.clear('PreviousListBook');

			localStorage.clear('bookSelected');

			localStorage.clear('services');

			console.log('Error Update: ', error);

			navigate('/dashboard-admin');
		}
	};

	useEffect(() => {
		fetchBooks();
		const servicesCurrent = localStorage.load('services');
		setSelectedServices(servicesCurrent as Services[]);
	}, [weekCurrent]);

	return (
		<div className="h-5/6 overflow-scroll mt-5">
			<div className="w-full mx-auto flex flex-col h-full">
				<div
					className={`relative flex flex-col justify-between space-y-4 w-full bg-default outline-none focus:outline-none  expandable ${
						showEditBook ? 'expanded' : ''
					} `}
				>
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
							<FormCalendar />
						</div>

						<div className="flex flex-col lg:space-y-7 px-2 pt-4 ">
							<SegmentService services={services} setServices={setServices} />

							{selectedServices ? (
								<ListServicesSelected
									selectedServices={selectedServices}
									setSelectedServices={setSelectedServices}
								/>
							) : (
								<div>Lista vuota...</div>
							)}

							<div className="font-base text-gray-500">
								{selectedServices ? (
									<text>Durata prenotazione: {sumHours(selectedServices)}</text>
								) : null}
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
	);
}
