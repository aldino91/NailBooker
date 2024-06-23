import { servicesPedicure } from '../../utils/constants';

interface Props {
	selectedServices: Array<{ [key: string]: string }>;
	setSelectedServices: (arg: Array<{ [key: string]: string }>) => void;
}

export default function ListServicesPedicure({
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
	);
}
