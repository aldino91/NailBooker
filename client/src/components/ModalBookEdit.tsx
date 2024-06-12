import { ChangeEvent, useEffect, useState } from 'react';
import { ListBook } from '../utils/interfaces';
import SegmentService from './SegmentService';
import ListServicesManicure from './ListServicesManicure';
import ListServicesPedicure from './ListServicesPedicure';
import ListServicesSelected from './ListServicesSelected';
import { sumHours } from '../utils/sumHours';
import FormCalendar from './FormCalendar';
import ButtonClose from './ButtonClose';
import HeaderInfoModalEdit from './HeaderInfoModalEdit';
import ButtonFooterModalEdit from './ButtonFooterModalEdit';
import { fetchDeleteBook } from '../api/fetchDeleteBook';
import { getWeek } from 'date-fns';
import { dateFromTo } from '../utils/dateFromTo';
import { fecthRangeDateBooks } from '../api/fetchRangeDateBooks';
import { searchServicesForEdit } from '../utils/searchServicesForEdit';
import AvailableHoursEdit from './AvailableHoursEdit';
import { arrayServices } from '../utils/arrayServices';
import { fromDateToTimeStamp } from '../utils/fromDateToTimeStamp';
import { DataUpdate, fetchUpdateBook } from '../api/fetchUpdateBook';

interface Props {
	showModal: boolean;
	setShowModal: (arg: boolean) => void;
	bookAvalable: ListBook[] | undefined;
	setBookAvalable: (arg: ListBook[]) => void;
	bookSelected: ListBook;
	dayCurrent: Date;
	refreshGet: boolean;
	setRefreshGet: (arg: boolean) => void;
}

export interface DataEditBook {
	duration: string;
	hourBook: string;
}

export default function ModalBookEdit({
	showModal,
	setShowModal,
	bookAvalable,
	setBookAvalable,
	bookSelected,
	dayCurrent,
	refreshGet,
	setRefreshGet,
}: Props): JSX.Element {
	const [showEditBook, setShowEditBook] = useState(false);
	const [showLoadingDelete, setShowLoadingDelete] = useState(false);
	const [showLoadingUpdate, setShowLoadingUpdate] = useState(false);
	const [startDate, setStartDate] = useState<Date>(dayCurrent);
	const [services, setServices] = useState<string>('Manicure');
	const [changeDayFilter, setChangeDayFilter] = useState(false);

	const [editBookData, setEditBookData] = useState<DataEditBook>();

	const [selectedServices, setSelectedServices] = useState<
		Array<{ [key: string]: string }>
	>(searchServicesForEdit(bookSelected.services));

	const [listBookDays, setListBookDays] = useState<ListBook[]>();

	const [listBooks, setListBooks] = useState<ListBook[]>();

	const [formData, setFormData] = useState({
		name: bookSelected.reservarName,
	});
	const [weekCurrent, setWeekCurrent] = useState(0);

	const [dateSelected, setDateSelected] = useState<Date>(new Date());

	const handlerDelete = async () => {
		try {
			setShowLoadingDelete(true);
			await fetchDeleteBook(bookSelected?.id!);
			if (bookAvalable !== undefined) {
				for (let i = 0; i < bookAvalable.length; i++) {
					if (bookAvalable[i].start === bookSelected?.start) {
						bookAvalable[i] = {
							available: true,
							duration: '00:00',
							reservarName: '',
							hourBook: bookAvalable[i].hourBook,
							status: 'disponible',
							services: [''],
							id: '',
							start: '',
							time: '',
						};
					}
				}
				setBookAvalable([...bookAvalable]);
				setShowLoadingDelete(false);
				setRefreshGet(!refreshGet);
				setShowModal(!showModal);
			} else {
				setShowLoadingDelete(false);
				setShowModal(!showModal);
			}
		} catch (error) {
			console.log('ERROR FETCH: ', error);
			setShowLoadingDelete(false);
			setShowModal(!showModal);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handlerSave = async () => {
		const { timeStamp } = fromDateToTimeStamp(
			new Date(dateSelected.toISOString())
		);
		const dataEdit: DataUpdate = {
			id: bookSelected?.id as string,
			dayBook: timeStamp,
			hourBook: editBookData?.hourBook as string,
			reservarName: formData.name,
			duration: editBookData?.duration as string,
			services: arrayServices(selectedServices),
		};
		try {
			setShowLoadingUpdate(true);
			const resp = await fetchUpdateBook(dataEdit);
			setShowLoadingUpdate(false);
			setRefreshGet(!refreshGet);
			setShowModal(!showModal);
			return resp?.data;
		} catch (error) {
			setShowLoadingUpdate(false);
			setShowModal(!showModal);
			console.log('Error Update: ', error);
		}
	};

	useEffect(() => {
		const { dateFrom, dateTo, dateCurrent } = dateFromTo(startDate as Date);
		const checkDay = new Date(startDate);
		const checkWeek = getWeek(checkDay);
		setWeekCurrent(checkWeek);
		const fetchBooks = async () => {
			try {
				const resp = await fecthRangeDateBooks(dateFrom, dateTo);
				setListBookDays(resp?.data);
				setDateSelected(startDate);
				const bookForDayCurrent = resp?.data.filter(
					(date: ListBook) => date.dayBook === dateCurrent
				);
				setListBooks(bookForDayCurrent);
				setChangeDayFilter(!changeDayFilter);
			} catch (err) {
				console.log(err);
			}
		};

		fetchBooks();
	}, [weekCurrent]);

	useEffect(() => {
		const { dateCurrent } = dateFromTo(dateSelected as Date);

		if (listBookDays) {
			const bookForDayCurrent = listBookDays.filter(
				(date) => date.dayBook === dateCurrent
			);
			setListBooks(bookForDayCurrent);
		}
	}, [changeDayFilter]);

	return (
		<div
			className={`h-full absolute top-0 left-0 z-40 ${
				showModal ? 'animate-slideInUp w-full' : 'animate-slideOutDown w-full'
			}`}
		>
			<div className="justify-center items-center flex overflow-x-hidden inset-0 fixed outline-none focus:outline-none w-full h-full bg-modal">
				<div className="w-full lg:w-1/2 mx-auto h-full flex flex-col justify-center">
					{/*content*/}
					<div
						className={`rounded-lg shadow-lg relative flex flex-col justify-between space-y-4 w-full bg-white outline-none focus:outline-none border-blueGray-200 h-full overflow-y-scroll expandable ${
							showEditBook ? 'expanded' : ''
						} `}
					>
						<ButtonClose setClose={() => setShowModal(!showModal)} />
						{/*header*/}
						<HeaderInfoModalEdit
							close={showEditBook}
							setClose={setShowEditBook}
							data={bookSelected}
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
									changeDayFilter={changeDayFilter}
									setChangeDayFilter={setChangeDayFilter}
									setDateSelected={setDateSelected}
									weekCurrent={weekCurrent}
									setWeekCurrent={setWeekCurrent}
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
								<AvailableHoursEdit
									dateCurrent={startDate}
									listBooks={listBooks}
									bookSelected={bookSelected}
									selectedServices={selectedServices}
									setEditBookData={setEditBookData}
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
											placeholder={bookSelected.reservarName}
											className="p-2 border-2 border-gray-300 rounded-lg w-full"
											value={formData.name}
											onChange={handleChange}
										/>
									</div>
								</div>
							</form>
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
