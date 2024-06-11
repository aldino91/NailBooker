import { servicesManicure } from '../utils/constants';

interface Props {
	selectedServices: Array<{ [key: string]: string }>;
	setSelectedServices: (arg: Array<{ [key: string]: string }>) => void;
	// handlerSelected: (arg: SelectedServices) => void;
}

export default function ListServicesManicure({
	selectedServices,
	setSelectedServices,
}: Props): JSX.Element {
	const handlerSelected = (data: {
		services: string;
		type: string;
		duration: string;
	}) => {
		setSelectedServices([...selectedServices, data]);
	};

	return (
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
	);
}
