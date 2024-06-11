import DatePicker, { registerLocale } from 'react-datepicker';
import { getWeek } from 'date-fns';
import { it } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { setDateStartCalendar } from '../utils/setDateStartCalendar';

registerLocale('it', it);

interface Props {
	startDate: Date;
	setStartDate: (date: Date) => void;
	changeDayFilter: boolean;
	setChangeDayFilter: (arg: boolean) => void;
	setDateSelected: (date: Date) => void;
	weekCurrent: number;
	setWeekCurrent: (week: number) => void;
}

export default function FormCalendar({
	startDate,
	setStartDate,
	changeDayFilter,
	setChangeDayFilter,
	setDateSelected,
	weekCurrent,
	setWeekCurrent,
}: Props): JSX.Element {
	const handlerDateSelected = (date: Date) => {
		setDateSelected(date);
		// setChangeDayFilter(!changeDayFilter);
	};

	const isWeekday = (date: Date): boolean => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	const handleChange = (date: Date) => {
		const checkDay = new Date(date);

		const checkWeek = getWeek(checkDay);

		setDateSelected(date as Date);

		if (checkWeek !== weekCurrent) {
			setStartDate(date);
			setWeekCurrent(checkWeek);
			setChangeDayFilter(!changeDayFilter);
		} else {
			setStartDate(date);
			setWeekCurrent(checkWeek);
			setChangeDayFilter(!changeDayFilter);
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
