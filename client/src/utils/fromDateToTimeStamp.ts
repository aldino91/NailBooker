import { formatDate } from './formateDate';
import { parseDate } from './parseDate';

export function fromDateToTimeStamp(dateCurrent: Date): {
	timeStamp: number;
	dayString: string;
} {
	const dayCurrent = formatDate(dateCurrent.toISOString());
	const date = parseDate(dayCurrent);

	return { timeStamp: date, dayString: dayCurrent };
}
