import { fromUnixTime } from 'date-fns';

import { toZonedTime, format } from 'date-fns-tz';

export function dateFromTimeStamp(dateTimeStamp: number): string {
	let date = fromUnixTime(dateTimeStamp);

	let timeZone = 'Europe/Rome';

	let zonedDate = toZonedTime(date, timeZone);

	let formattedDate = format(zonedDate, 'dd/MM/yyyy', { timeZone });

	console.log(formattedDate);

	return formattedDate;
}
