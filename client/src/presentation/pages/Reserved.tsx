import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListServicesManicure from '../components/ListServicesManicure';
import ListServicesPedicure from '../components/ListServicesPedicure';
import LocalStorageHelper from '../../utils/localStorage';

import BaseLayout from '../components/BaseLayout';
import HeaderBar from '../components/HeaderBar';
import SegmentService from '../../components/SegmentService';
import { sumHours } from '../../utils/sumHours';
import { bgColorDefault, bgColorDisable } from '../../utils/constants';

export default function Reserved(): JSX.Element {
	const localStorage = new LocalStorageHelper<
		Array<{ services: string; type: string; time: string }>
	>();

	const navigate = useNavigate();

	const [services, setServices] = useState<string>('Manicure');

	const [selectedServices, setSelectedServices] = useState<Array<any>>([]);

	const handlerSubmit = (
		data: Array<{ services: string; type: string; time: string }>
	) => {
		localStorage.save('book', data);
		navigate('/calendar');
	};

	return (
		<BaseLayout>
			{/* <BaseAuthorized> */}
			<div className="flex flex-col space-y-6 h-full">
				<HeaderBar title="Prenotazione" />
				<div className="w-full px-2 flex flex-col space-y-3 ">
					<div className="font-medium">
						<h2>Type services</h2>
					</div>

					<SegmentService services={services} setServices={setServices} />
				</div>
				<div className="w-full px-2 flex flex-col space-y-3 ">
					<div className="font-medium">
						<h2>Servizi scelti</h2>
					</div>
					{selectedServices.length === 0 && (
						<div className="underline">Nessun servizio scelto</div>
					)}
					<div className="w-full flex flex-wrap">
						{selectedServices?.map((service, i) => {
							return (
								<div
									key={i}
									className={`${
										service.type === 'manicure'
											? 'bg-indigo-400 text-white'
											: 'bg-rose-400 text-white'
									} text-white rounded-3xl p-2 m-1 text-center cursor-pointer`}
									onClick={() => console.log('delete')}
								>
									{service.services}
								</div>
							);
						})}
					</div>

					<div className="font-base text-gray-500">
						<text>Durata prenotazione: {sumHours(selectedServices)}</text>
					</div>
				</div>
				<div className="w-full px-2">
					<div className="font-medium">
						<h2>{services}</h2>
					</div>

					{services === 'Manicure' && (
						<ListServicesManicure
							selectedServices={selectedServices}
							setSelectedServices={setSelectedServices}
						/>
					)}

					{services === 'Pedicure' && (
						<ListServicesPedicure
							selectedServices={selectedServices}
							setSelectedServices={setSelectedServices}
						/>
					)}
				</div>

				<div className="w-full flex flex-row justify-center pb-10 px-3">
					<button
						className={`p-2 text-center ${
							selectedServices.length === 0 ? bgColorDisable : bgColorDefault
						}  w-full rounded-3xl text-white`}
						onClick={() => handlerSubmit(selectedServices)}
						disabled={selectedServices.length === 0 ? true : false}
					>
						Continuare
					</button>
				</div>
			</div>
			{/* </BaseAuthorized> */}
		</BaseLayout>
	);
}
