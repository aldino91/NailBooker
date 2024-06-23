import { addDays, startOfWeek } from 'date-fns';
import { formatDate } from './formateDate';
import { parseDate } from './parseDate';

export function dateFromTo(date: Date): {
	dateCurrent: number;
	dateTo: number;
	dateFrom: number;
} {
	if (date.getDay() === 0) {
		const dayCurrent = parseDate(formatDate(addDays(date, 1).toISOString()));
		const dayTo = parseDate(formatDate(addDays(date, 5).toISOString()));
		const dateFrom = parseDate(formatDate(addDays(date, 1).toISOString()));

		return { dateFrom: dateFrom, dateTo: dayTo, dateCurrent: dayCurrent };
	}

	if (date.getDay() === 6) {
		const dayCurrent = parseDate(formatDate(addDays(date, 2).toISOString()));
		const dayTo = parseDate(formatDate(addDays(date, 6).toISOString()));
		const dateFrom = parseDate(formatDate(addDays(date, 2).toISOString()));

		return { dateFrom: dateFrom, dateTo: dayTo, dateCurrent: dayCurrent };
	}
	if (date.getDay() === 5) {
		const dayCurrent = parseDate(formatDate(date.toISOString()));
		const dayTo = parseDate(formatDate(addDays(date, 1).toISOString()));
		const dateFrom = parseDate(
			formatDate(addDays(startOfWeek(date), 1).toISOString())
		);

		return { dateFrom: dateFrom, dateTo: dayTo, dateCurrent: dayCurrent };
	}
	if (date.getDay() === 4) {
		const dayCurrent = parseDate(formatDate(date.toISOString()));
		const dayTo = parseDate(formatDate(addDays(date, 2).toISOString()));
		const dateFrom = parseDate(
			formatDate(addDays(startOfWeek(date), 1).toISOString())
		);

		return { dateFrom: dateFrom, dateTo: dayTo, dateCurrent: dayCurrent };
	}
	if (date.getDay() === 3) {
		const dayCurrent = parseDate(formatDate(date.toISOString()));
		const dayTo = parseDate(formatDate(addDays(date, 2).toISOString()));
		const dateFrom = parseDate(
			formatDate(addDays(startOfWeek(date), 1).toISOString())
		);

		return { dateFrom: dateFrom, dateTo: dayTo, dateCurrent: dayCurrent };
	}
	if (date.getDay() === 2) {
		const dayCurrent = parseDate(formatDate(date.toISOString()));
		const dayTo = parseDate(formatDate(addDays(date, 3).toISOString()));
		const dateFrom = parseDate(
			formatDate(addDays(startOfWeek(date), 1).toISOString())
		);

		return { dateFrom: dateFrom, dateTo: dayTo, dateCurrent: dayCurrent };
	}
	const dayCurrent = parseDate(formatDate(date.toISOString()));
	const dayTo = parseDate(formatDate(addDays(date, 4).toISOString()));
	const dateFrom = parseDate(
		formatDate(addDays(startOfWeek(date), 1).toISOString())
	);

	return { dateFrom: dateFrom, dateTo: dayTo, dateCurrent: dayCurrent };
}
