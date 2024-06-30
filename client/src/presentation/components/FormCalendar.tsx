import DatePicker, { registerLocale } from 'react-datepicker';
import { fromUnixTime, getWeek } from 'date-fns';
import { it } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { setDateStartCalendar } from '../../utils/setDateStartCalendar';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';
import { dateFromTo } from '../../utils/dateFromTo';

registerLocale('it', it);

export default function FormCalendar(): JSX.Element {
	const { filterBooksByDate, startDate, setStartDate, weekCurrent } =
		useReservationStore();

	const handlerDateSelected = (date: Date) => {
		const { dateCurrent, checkWeek } = dateFromTo(date);

		const week = getWeek(checkWeek, { weekStartsOn: 1 });

		if (week !== weekCurrent) {
			setStartDate(fromUnixTime(dateCurrent));
			useReservationStore.setState({ dateSelected: date });
			useReservationStore.setState({
				weekCurrent: week,
			});
		} else {
			setStartDate(date);
			useReservationStore.setState({ dateSelected: date });
			filterBooksByDate(date);
		}
	};

	const isWeekday = (date: Date): boolean => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	return (
		<div className="w-full flex flex-row justify-center px-3  rounded-3xl">
			<DatePicker
				locale="it"
				selected={setDateStartCalendar(startDate as Date)}
				onChange={(date) => handlerDateSelected(date as Date)}
				// onSelect={(date) => handlerDateSelected(date as Date)}
				minDate={new Date()}
				filterDate={(date) => isWeekday(date)}
				calendarStartDay={1}
				inline
			/>
		</div>
	);
}
