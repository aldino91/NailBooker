import DatePicker, { registerLocale } from 'react-datepicker';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { it } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('it', it);

interface Props {
	startDate: Date | string;
	setStartDate: (date: Date | string) => void;
}

export default function FormCalendar({
	startDate,
	setStartDate,
}: Props): JSX.Element {
	const handlerDateSelected = (date: Date) => {
		const day = date.getDay();

		console.log('number day: ', day);
		setStartDate(date.toISOString());
	};

	const isWeekday = (date: Date): boolean => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	const handleChange = (date: Date | null) => {
		if (date) {
			const timeZone = 'Europe/Rome';
			const formattedDate = formatInTimeZone(
				date,
				timeZone,
				'dd/MM/yyyy HH:mm:ss'
			);
			console.log('ON-CHANGE', formattedDate);
		}
	};

	return (
		<div className="w-full flex flex-row justify-center px-3  rounded-3xl">
			<DatePicker
				locale="it"
				selected={startDate as Date}
				onSelect={(date) => handlerDateSelected(date)}
				onChange={(date) => handleChange(date)}
				minDate={new Date()}
				filterDate={(date) => isWeekday(date)}
				inline
			/>
		</div>
	);
}
