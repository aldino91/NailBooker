import DatePicker, { registerLocale } from 'react-datepicker';
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
		setStartDate(date.toISOString());
		console.log('handlerDateSelected', date.toISOString());
	};

	const isWeekday = (date: Date): boolean => {
		const day = date.getDay();
		return day !== 0 && day !== 6;
	};

	return (
		<div className="w-full flex flex-row justify-center px-3  rounded-3xl">
			<DatePicker
				locale="it"
				selected={startDate as Date}
				onSelect={(date) => handlerDateSelected(date)}
				onChange={(date) => console.log('ON-CHANGE', date?.toISOString())}
				minDate={new Date()}
				filterDate={(date) => isWeekday(date)}
				inline
			/>
		</div>
	);
}
