import { useState } from 'react';
import { bgColorDefault } from '../utils/constants';

export default function AvailableHours(): JSX.Element {
	const [selectedHours, setSelectedHours] = useState<string[]>([]);

	const handlerSelected = (hours: string) => {
		const findHour = selectedHours.find((h) => h === hours);
		if (findHour !== undefined) {
			const indexElement = selectedHours.indexOf(hours);
			selectedHours.splice(indexElement, 1);
			setSelectedHours([...selectedHours]);
		} else {
			setSelectedHours([...selectedHours, hours]);
		}
	};

	const hoursAvailable = filterAvalableHours();
	return (
		<div className="w-full flex flex-row justify-center px-3 ">
			<div className="w-full rounded-3xl box-shadow px-3 flex flex-col space-y-3 py-3">
				<div className="">
					<text className=" font-semibold">Orari disponibili</text>
				</div>

				<div className="grid grid-cols-4 gap-4">
					{hoursAvailable.map((hours, i) => {
						return (
							<button
								key={i}
								// disabled={
								// 	// hoursAvailable.find((h) => h.available === false)
								// 	// 	? true
								// 	// 	: false
								// }
								className={`border border-gray-200 rounded-3xl py-2 px-2 box-shadow mr-2 text-center cursor-pointer ${
									hours.available === false
										? 'bg-gray-500 text-white'
										: 'bg-green-400 text-black'
								}`}
								// onClick={() => handlerSelected(hours.hourBook)}
							>
								{hours.hourBook}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export const filterAvalableHours = (): Array<{
	hourBook: string;
	time: number;
	available: boolean;
}> => {
	let totalHoursNewBook = 0;

	for (let i = 0; i < newBook.length; i++) {
		totalHoursNewBook += newBook[i].time;
	}

	for (let i = 0; i < listHoursAvalable.length; i++) {
		for (let reserved of listBook) {
			if (listHoursAvalable[i].hourBook === reserved.hourBook) {
				listHoursAvalable[i].available = false;
			}
		}
	}

	let selectedHoursAvailable = 0;

	for (let i = 0; i <= listHoursAvalable.length; i++) {
		// if (listHoursAvalable[i].available == listHoursAvalable[i + 1].available) {
		// 	listHoursAvalable[i].available = true;
		// } else {
		// 	listHoursAvalable[i].available = false;
		// }
	}
	console.log(listHoursAvalable);
	return listHoursAvalable;
};

const listHoursAvalable = [
	{
		hourBook: '09:00',
		time: 1,
		available: true,
	},
	{
		hourBook: '10:00',
		time: 1,
		available: true,
	},
	{
		hourBook: '11:00',
		time: 1,
		available: true,
	},
	{
		hourBook: '12:00',
		time: 1,
		available: true,
	},
	{
		hourBook: '13:00',
		time: 1,
		available: true,
	},
	{
		hourBook: '15:00',
		time: 1,
		available: true,
	},
	{
		hourBook: '16:00',
		time: 1,
		available: true,
	},
	{
		hourBook: '17:00',
		time: 1,
		available: true,
	},
	{
		hourBook: '18:00',
		time: 1,
		available: true,
	},
	{
		hourBook: '19:00',
		time: 1,
		available: true,
	},
];

const listBook = [
	{
		services: 'Manicure classica',
		type: 'manicure',
		time: 1,
		hourBook: '16:00',
	},
	{ services: 'Smalto gel', type: 'manicure', time: 1, hourBook: '10:00' },
	{
		services: 'Pedicure classica',
		type: 'pedicure',
		time: 1,
		hourBook: '15:00',
	},
];

const newBook = [
	{
		services: 'Manicure classica',
		type: 'manicure',
		time: 1,
		bookingTime: '00:00',
	},
	{ services: 'Smalto gel', type: 'manicure', time: 1, bookingTime: '00:00' },
];
