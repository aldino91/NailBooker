import DatePicker, { registerLocale } from 'react-datepicker';
import { getWeek } from 'date-fns';
import { it } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { setDateStartCalendar } from '../../utils/setDateStartCalendar';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';

registerLocale('it', it);

interface Props {
	startDate: Date;
	setStartDate: (date: Date) => void;
	weekCurrent: number;
}

export default function FormCalendar({
	startDate,
	setStartDate,
	weekCurrent,
}: Props): JSX.Element {
	const { filterBooksByDate } = useReservationStore();

	const handlerDateSelected = (date: Date) => {
		useReservationStore.setState({ dateSelected: date });
	};

	const isWeekday = (date: Date): boolean => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	const handleChange = (date: Date) => {
		const checkDay = new Date(date);

		const checkWeek = getWeek(checkDay);

		console.log('checkWeek: ', checkWeek, 'weekCurrent: ', weekCurrent);

		if (checkWeek !== weekCurrent) {
			setStartDate(date);
			useReservationStore.setState({ weekCurrent: checkWeek });
		} else {
			setStartDate(date);
			filterBooksByDate(date);
		}
	};

	return (
		<div className="w-full flex flex-row justify-center px-3  rounded-3xl">
			<DatePicker
				locale="it"
				selected={setDateStartCalendar(startDate as Date)}
				onSelect={(date) => handlerDateSelected(date)}
				onChange={(date) => handleChange(date as Date)}
				minDate={new Date()}
				filterDate={(date) => isWeekday(date)}
				calendarStartDay={1}
				inline
			/>
		</div>
	);
}
