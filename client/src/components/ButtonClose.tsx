import { Books } from '../domain/entities/Books';
import { useReservationStore } from '../infrastructure/store/reservationsStore';
import LocalStorageHelper from '../utils/localStorage';

interface Props {
	setClose: (close: boolean) => void;
}

export default function ButtonClose({ setClose }: Props): JSX.Element {
	const localStorage = new LocalStorageHelper();

	const previousList = localStorage.load('PreviousListBook');

	const handlerClose = () => {
		if (previousList !== null) {
			useReservationStore.setState({
				listBookDays: previousList as Books[],
			});
			localStorage.clear('PreviousListBook');
			setClose(false);
		} else {
			localStorage.clear('PreviousListBook');
			setClose(false);
		}
	};
	return (
		<button
			className="text-black background-transparent font-bol text-sm outline-none focus:outline-none hover:shadow-lg ease-linear transition-all duration-150 absolute top-2 right-2 border-2 border-solid border-black rounded-full"
			type="button"
			onClick={handlerClose}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="size-6 stroke-2"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18 18 6M6 6l12 12"
				/>
			</svg>
		</button>
	);
}
