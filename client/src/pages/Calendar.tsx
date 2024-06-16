import { useEffect, useState } from 'react';
import BaseLayout from '../presentation/components/BaseLayout';
import { bgColorDefault, bgColorDisable } from '../utils/constants';
import { fecthAuthorized } from '../api/fetchAuthorized';
import HeaderBar from '../presentation/components/HeaderBar';

export default function Calendar(): JSX.Element {
	const [startDate, setStartDate] = useState<Date | string>(new Date());
	const [bookSelected, setBookSelected] = useState(true);

	useEffect(() => {
		fecthAuthorized('register')
			.then((resp) => {
				console.log(resp?.data);
				return resp?.data;
			})
			.catch((err) => {
				return err;
			});
	}, []);
	return (
		<BaseLayout>
			<HeaderBar title="Calendario" href="reserved" />
			<div className="flex flex-col space-y-8 py-6">
				{/* <FormCalendar startDate={startDate} setStartDate={setStartDate} /> */}
				{/* <AvailableHours
					dateCurrent={startDate as string}
					setBookSelected={setBookSelected}
				/> */}
				<div className="w-full flex flex-row justify-center px-3">
					<button
						className={`w-full p-2 rounded-3xl ${
							bookSelected ? bgColorDisable : bgColorDefault
						}  text-white box-shadow`}
						// onClick={() => filterAvalableHours()}
						disabled={bookSelected}
					>
						Conferma
					</button>
				</div>
			</div>
		</BaseLayout>
	);
}
