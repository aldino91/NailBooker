import { useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import HeaderBar from '../components/HeaderBar';
import { useNavigate } from 'react-router-dom';
import { bgColorDefault } from '../utils/constants';

export default function Reserved(): JSX.Element {
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
											console.log(selectedServices);
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
											console.log(selectedServices);
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
						className={`p-2 text-center ${bgColorDefault}  w-full rounded-3xl text-white`}
						onClick={() => navigate('/calendar')}
					>
						Continuare
					</button>
				</div>
			</div>
		</BaseLayout>
	);
}

const servicesManicure = [
	{ services: 'Manicure classica', type: 'manicure', time: '1' },
	{ services: 'Smalto gel', type: 'manicure', time: '1' },
	{ services: 'French manicure', type: 'manicure', time: '1' },
	{ services: 'Rinforzo unghie naturali', type: 'manicure', time: '1' },
	{ services: 'Nail art personalizzata', type: 'manicure', time: '1' },
	{ services: 'Trattamento per unghie fragili', type: 'manicure', time: '1' },
	{
		services: 'Trattamento idratante per cuticole',
		type: 'manicure',
		time: '1',
	},
	{ services: 'Rimozione gel/acrilico', type: 'manicure', time: '1' },
	{
		services: 'Trattamento per unghie danneggiate',
		type: 'manicure',
		time: '1',
	},
	{ services: 'French pedicure', type: 'manicure', time: '1' },
	{ services: 'Rifinitura e limatura unghie', type: 'manicure', time: '1' },
	{ services: 'Servizio per unghie lunghe', type: 'manicure', time: '1' },
	{ services: 'Servizio per unghie corte', type: 'manicure', time: '1' },
	{ services: 'Trattamento per unghie gialle', type: 'manicure', time: '1' },
	{ services: 'Trattamento per unghie opache', type: 'manicure', time: '1' },
	{ services: 'Trattamento per unghie secche', type: 'manicure', time: '1' },
	{ services: 'Smalto semipermanente', type: 'manicure', time: '1' },
	{
		services: 'Trattamento per unghie con gel ibrido',
		type: 'manicure',
		time: '1',
	},
	{ services: 'Servizio per unghie naturali', type: 'manicure', time: '1' },
	{ services: 'Manicure e pedicure per uomini', type: 'manicure', time: '1' },
];

const servicesPedicure = [
	{ services: 'Pedicure classica', type: 'pedicure', time: '1' },
	{ services: 'French pedicure', type: 'pedicure', time: '1' },
	{ services: 'Manicure e pedicure spa', type: 'pedicure', time: '1' },
	{ services: 'Pedicure medicali', type: 'pedicure', time: '1' },
	{ services: 'Massaggio mani e piedi', type: 'pedicure', time: '1' },
	{
		services: 'Trattamento esfoliante per mani e piedi',
		type: 'pedicure',
		time: '1',
	},
	{ services: 'Trattamento per unghie incarnite', type: 'pedicure', time: '1' },
	{ services: 'Trattamento per unghie striate', type: 'pedicure', time: '1' },
	{ services: 'Pedicure classica', type: 'pedicure', time: '1' },
	{ services: 'Smalto gel', type: 'pedicure', time: '1' },
	{ services: 'Ricostruzione unghie in gel', type: 'pedicure', time: '1' },
	{ services: 'Ricostruzione unghie in acrilico', type: 'pedicure', time: '1' },
	{ services: 'Decorazioni artistiche', type: 'pedicure', time: '1' },
	{ services: 'Trattamento per unghie fragili', type: 'pedicure', time: '1' },
	{ services: 'Extension unghie', type: 'pedicure', time: '1' },
	{
		services: 'Trattamento idratante per cuticole',
		type: 'pedicure',
		time: '1',
	},
	{ services: 'Rimozione gel/acrilico', type: 'pedicure', time: '1' },
	{
		services: 'Trattamento per unghie danneggiate',
		type: 'pedicure',
		time: '1',
	},
	{ services: 'French manicure', type: 'pedicure', time: '1' },
	{ services: 'Rinforzo unghie naturali', type: 'pedicure', time: '1' },
	{ services: 'Servizio per unghie lunghe', type: 'pedicure', time: '1' },
];
