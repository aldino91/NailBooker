import { getUnixTime, parse } from 'date-fns';

export function parseDate(day: string): number {
	const dateParse = parse(day, 'dd/MM/yyyy', new Date());
	const date = getUnixTime(dateParse);
	return date;
}
