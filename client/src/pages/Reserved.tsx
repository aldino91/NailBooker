import { useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import HeaderBar from '../components/HeaderBar';
import { useNavigate } from 'react-router-dom';
import {
	bgColorDefault,
	bgColorDisable,
	servicesManicure,
	servicesPedicure,
} from '../utils/constants';
import LocalStorageHelper from '../utils/localStorage';
import { sumHours } from '../utils/sumHours';

export default function Reserved(): JSX.Element {
	const localStorage = new LocalStorageHelper<
		Array<{ services: string; type: string; time: string }>
	>();

	const navigate = useNavigate();

	const [services, setServices] = useState<string>('Manicure');

	const [selectedServices, setSelectedServices] = useState<
		Array<{ services: string; type: string; time: string }>
	>([]);

	const handlerSelected = (data: {
		services: string;
		type: string;
		time: string;
	}) => {
		setSelectedServices([...selectedServices, data]);
	};

	const handlerDeleted = (data: {
		services: string;
		type: string;
		time: string;
	}) => {
		const indexElement = selectedServices.indexOf(data);

		selectedServices.splice(indexElement, 1);
		setSelectedServices([...selectedServices]);
	};

	const handlerSubmit = (
		data: Array<{ services: string; type: string; time: string }>
	) => {
		localStorage.save(data, 'book');
		navigate('/calendar');
	};

	return (
		<BaseLayout>
			<div className="flex flex-col space-y-6 h-full">
				<HeaderBar title="Prenotazione" />
				<div className="w-full px-2 flex flex-col space-y-3 ">
					<div className="font-medium">
						<h2>Type services</h2>
					</div>

					<div className="w-full flex flex-row justify-center">
						<div
							className={`w-6/12 hover:opacity-80 ${
								services === 'Pedicure'
									? 'box-inner-manicure rounded-l-3xl'
									: 'rounded-l-3xl manicure'
							} p-2 text-center cursor-pointer`}
							onClick={() => {
								setServices('Manicure');
							}}
						>
							Manicure
						</div>
						<div
							className={`w-6/12 hover:opacity-80 ${
								services === 'Manicure'
									? 'box-inner-pedicure rounded-r-3xl'
									: 'rounded-r-3xl pedicure'
							} p-2 text-center cursor-pointer`}
							onClick={() => {
								setServices('Pedicure');
							}}
						>
							Pedicure
						</div>
					</div>
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
									onClick={() => handlerDeleted(service)}
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
						<div className="w-full flex flex-wrap">
							{servicesManicure.map((nailService, i) => {
								return (
									<button
										key={i}
										disabled={
											selectedServices.find((data) => data === nailService)
												? true
												: false
										}
										className={`cursor-pointer border-2 border-indigo-200 rounded-3xl p-1 m-1 ${
											selectedServices.find((data) => data === nailService)
												? 'bg-indigo-400 text-white'
												: 'bg-white text-black'
										}`}
										onClick={() => {
											handlerSelected(nailService);
										}}
									>
										<text>{nailService.services}</text>
									</button>
								);
							})}
						</div>
					)}

					{services === 'Pedicure' && (
						<div className="w-full flex flex-wrap">
							{servicesPedicure.map((nailService, i) => {
								return (
									<button
										key={i}
										disabled={
											selectedServices.find((data) => data === nailService)
												? true
												: false
										}
										className={`cursor-pointer border-2 border-rose-200 rounded-3xl p-1 m-1 ${
											selectedServices.find((data) => data === nailService)
												? 'bg-rose-400 text-white'
												: 'bg-white text-black'
										}`}
										onClick={() => {
											handlerSelected(nailService);
										}}
									>
										<text>{nailService.services}</text>
									</button>
								);
							})}
						</div>
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
		</BaseLayout>
	);
}
