import { useEffect } from 'react';

interface Props {
	selectedServices: Array<any>;
	setSelectedServices: (arg: Array<any>) => void;
}

export default function ListServicesSelected({
	selectedServices,
	setSelectedServices,
}: Props): JSX.Element {
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
		<div className="w-full flex flex-wrap">
			{selectedServices?.map((service, i) => {
				return (
					<div
						key={i}
						className={`${
							service.type === 'manicure'
								? 'bg-indigo-400 text-white'
								: 'bg-rose-400 text-white'
						} text-white rounded-3xl px-1 m-1 text-center cursor-pointer`}
						onClick={() => handlerDeleted(service)}
					>
						{service.services}
					</div>
				);
			})}
		</div>
	);
}
