import { describe, expect, it } from 'vitest';
import { filterHoursAvailable } from './filterHoursAvailable';
import { listHoursAvalable } from '../../utils/constants';

describe('Filter hours available', () => {
	it('return list book', () => {
		const filterDayBook = bookingsTest.filter((book) => book.dayBook === 1);

		const result = filterHoursAvailable(filterDayBook, listHoursAvalable);

		expect(result).toBeInstanceOf(Array);
		expect(result).toHaveLength(21);
		expect(result[5]).toHaveProperty('status', 'occupato');
		expect(filterDayBook).toHaveLength(3);
	});
});

const bookingsTest = [
	{
		id: '1',
		dayBook: 1,
		hourBook: '09:00',
		duration: '00:30',
		status: 'occupato',
		available: false,
		reservarName: 'Alice',
		services: ['manicure', 'pedicure'],
		time: '09:00',
		start: '09:00',
		usersId: 'u1',
	},
	{
		id: '2',
		dayBook: 1,
		hourBook: '10:00',
		duration: '01:00',
		status: 'occupato',
		available: false,
		reservarName: 'Bob',
		services: ['haircut'],
		time: '10:00',
		start: '10:00',
		usersId: 'u2',
	},
	{
		id: '3',
		dayBook: 1,
		hourBook: '11:00',
		duration: '01:30',
		status: 'occupato',
		available: false,
		reservarName: 'Charlie',
		services: ['massage'],
		time: '11:00',
		start: '11:00',
		usersId: 'u3',
	},
	{
		id: '4',
		dayBook: 3,
		hourBook: '14:00',
		duration: '00:30',
		status: 'occupato',
		available: false,
		reservarName: 'David',
		services: ['facial'],
		time: '14:00',
		start: '14:00',
		usersId: 'u4',
	},
	{
		id: '5',
		dayBook: 2,
		hourBook: '18:00',
		duration: '01:00',
		status: 'occupato',
		available: false,
		reservarName: 'Eve',
		services: ['manicure'],
		time: '18:00',
		start: '18:00',
		usersId: 'u5',
	},
];
