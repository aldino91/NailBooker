import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function FormCalendar(): JSX.Element {
	const [startDate, setStartDate] = useState<any>(new Date());
	return (
		<div className="w-full flex flex-row justify-center px-3  rounded-3xl">
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
				inline
			/>
		</div>
	);
}
