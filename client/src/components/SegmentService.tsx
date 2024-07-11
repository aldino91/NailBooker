interface Props {
	services: string;
	setServices: (service: string) => void;
}

export default function SegmentService({
	services,
	setServices,
}: Props): JSX.Element {
	return (
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
	);
}
