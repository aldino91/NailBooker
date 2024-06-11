import { addDays } from 'date-fns';

export function setDateStartCalendar(date: Date): Date {
	if (date.getDay() === 0) {
		const dayCurrent = addDays(date, 1);
		return dayCurrent;
	}

	if (date.getDay() === 6) {
		const dayCurrent = addDays(date, 2);
		return dayCurrent;
	}
	if (
		date.getDay() === 5 ||
		date.getDay() === 4 ||
		date.getDay() === 3 ||
		date.getDay() === 2
	) {
		return date;
	}

	return date;
}
