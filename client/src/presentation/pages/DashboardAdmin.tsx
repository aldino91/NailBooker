import { useEffect, useState } from 'react';
import BaseLayout from '../presentation/components/BaseLayout';
import FormCalendar from '../components/FormCalendar';
import HeaderBar from '../components/HeaderBar';
import AvailableHoursAdmin from '../components/AvailableHoursAdmin';
import { ListBook } from '../utils/interfaces';
import { fecthRangeDateBooks } from '../api/fetchRangeDateBooks';
import { dateFromTo } from '../utils/dateFromTo';
import { setDateStartCalendar } from '../utils/setDateStartCalendar';
import { getWeek } from 'date-fns';

export default function DashboardAdmin(): JSX.Element {
	const [changeDayFilter, setChangeDayFilter] = useState(false);

	const [startDate, setStartDate] = useState<Date>(new Date());

	const [weekCurrent, setWeekCurrent] = useState(0);

	const [dateSelected, setDateSelected] = useState<Date>(new Date());

	const [listBookDays, setListBookDays] = useState<ListBook[]>();

	const [listBooks, setListBooks] = useState<ListBook[] | undefined>();

	const [refreshGet, setRefreshGet] = useState(false);

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
		console.log('refreshGet!!!');
	}, [weekCurrent, refreshGet]);

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
		<BaseLayout>
			<HeaderBar title="Dashboard Admin" href="" />
			<div className="flex flex-col space-y-5 mb-6">
				<FormCalendar
					startDate={startDate as Date}
					setStartDate={setStartDate}
					changeDayFilter={changeDayFilter}
					setChangeDayFilter={setChangeDayFilter}
					setDateSelected={setDateSelected}
					weekCurrent={weekCurrent}
					setWeekCurrent={setWeekCurrent}
				/>
				<AvailableHoursAdmin
					dateCurrent={setDateStartCalendar(startDate as Date)}
					listBooks={listBooks}
					refreshGet={refreshGet}
					setRefreshGet={setRefreshGet}
				/>
				{/* <div className="w-full flex flex-row justify-center px-3">
					<button
						className={`w-full p-2 rounded-3xl ${
							bookSelected ? bgColorDisable : bgColorDefault
						}  text-white box-shadow`}
						// onClick={() => filterAvalableHours()}
						disabled={bookSelected}
					>
						Conferma
					</button>
				</div> */}
			</div>
		</BaseLayout>
	);
}
