import { servicesPedicure } from '../../utils/constants';
import { Services } from './BodyEditBook';

interface Props {
	selectedServices: Services[] | undefined;
	setSelectedServices: (arg: Services[]) => void;
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
		if (selectedServices) {
			setSelectedServices([...selectedServices, data]);
		} else {
			setSelectedServices([data]);
		}
	};
	return (
		<div className="w-full flex flex-wrap">
			{servicesPedicure.map((nailService, i) => {
				return (
					<button
						key={i}
						disabled={
							selectedServices?.find((data) => data === nailService)
								? true
								: false
						}
						className={`cursor-pointer border-2 border-rose-200 rounded-3xl p-1 m-1 ${
							selectedServices?.find((data) => data === nailService)
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
