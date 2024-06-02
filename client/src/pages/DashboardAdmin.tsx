import { useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import FormCalendar from '../components/FormCalendar';
import HeaderBar from '../components/HeaderBar';
import {
	bgColorDefault,
	bgColorDisable,
	listBookDays,
} from '../utils/constants';
import AvailableHoursAdmin from '../components/AvailableHoursAdmin';
import { formatDate } from '../utils/formateDate';
import { ListBook } from '../utils/interfaces';
import { fecthRangeDateBooks } from '../api/fetchRangeDateBooks';

export default function DashboardAdmin(): JSX.Element {
	const [startDate, setStartDate] = useState<Date | string>(new Date());

	const [bookSelected, setBookSelected] = useState(true);

	const [listBooks, setListBooks] = useState<ListBook[] | undefined>();

	const dayCurrent = formatDate(startDate as string);

	useEffect(() => {
		const bookForDayCurrent = listBookDays.find(
			(date) => date.day === dayCurrent
		);
		if (bookForDayCurrent) {
			const listBookDayCurrent = bookForDayCurrent.book;
			setListBooks(listBookDayCurrent);
		} else {
			setListBooks(undefined);
		}
	}, [startDate, listBooks, dayCurrent]);

	useEffect(() => {
		fecthRangeDateBooks('03/06/2024', '06/06/2024')
			.then((resp) => {
				console.log(resp?.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<BaseLayout>
			<HeaderBar title="Dashboard Admin" href="" />
			<div className="flex flex-col space-y-5 mb-6">
				<FormCalendar startDate={startDate} setStartDate={setStartDate} />
				<AvailableHoursAdmin
					dateCurrent={startDate as string}
					listBooks={listBooks}
				/>
				<div className="w-full flex flex-row justify-center px-3">
					<button
						className={`w-full p-2 rounded-3xl ${
							bookSelected ? bgColorDisable : bgColorDefault
						}  text-white box-shadow`}
						// onClick={() => filterAvalableHours()}
						disabled={bookSelected}
					>
						Conferma
					</button>
				</div>
			</div>
		</BaseLayout>
	);
}
