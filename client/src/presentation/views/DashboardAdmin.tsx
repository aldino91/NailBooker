import { useEffect } from 'react';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';
import BaseLayout from '../components/BaseLayout';
import HeaderBar from '../components/HeaderBar';
import FormCalendar from '../components/FormCalendar';
import { setDateStartCalendar } from '../../utils/setDateStartCalendar';
import AvailableHoursAdmin from '../components/AvailableHoursAdmin';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardAdmin(): JSX.Element {
	const { weekCurrent, dateSelected, fetchBooks, startDate, isLoading } =
		useReservationStore();

	useEffect(() => {
		fetchBooks();
	}, [weekCurrent]);

	return (
		<BaseLayout>
			<HeaderBar title="Dashboard Admin" href="" />
			<div className="flex flex-col space-y-5 mb-6">
				<FormCalendar weekCurrent={weekCurrent} />

				{isLoading ? (
					<div className="flex flex-row justify-center h-56">
						<LoadingSpinner width="50" strokeColor="rgb(192 132 252)" />
					</div>
				) : (
					<AvailableHoursAdmin
						dateCurrent={setDateStartCalendar(startDate)}
						dateSelected={dateSelected}
					/>
				)}
			</div>
		</BaseLayout>
	);
}
