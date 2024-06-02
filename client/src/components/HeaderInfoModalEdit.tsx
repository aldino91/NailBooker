import { ModalData } from '../utils/interfaces';
import IconCollapse from './IconCollapse';

interface Props {
	data: ModalData;
	close: boolean;
	setClose: (ard: boolean) => void;
}

export default function HeaderInfoModalEdit({
	data,
	close,
	setClose,
}: Props): JSX.Element {
	return (
		<div className="flex flex-col px-3 space-y-4">
			<div>
				<h3 className="text-3xl font-semibold">Aggiorna prenotazione</h3>
			</div>
			<div className="flex flex-row justify-between items-center w-full">
				<div className="flex-col items-start justify-between rounded-t w-3/4">
					<div>
						<text>Nome: {data.name}</text>
					</div>
					<div>
						<text>Giorno: {data.day}</text>
					</div>
					<div>
						<text>Ora: {data.hour}</text>
					</div>
					<div>
						<text>Stato: {data.status}</text>
					</div>
					<div>
						<text>Inizio: {data.start}</text>
					</div>
				</div>

				<div>
					<button
						className="bg-yellow-500 text-white active:bg-yellow-600 w-full font-bold text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex flex-row justify-center"
						type="button"
						onClick={() => setClose(!close)}
					>
						{!close ? 'Aggiorna' : <IconCollapse />}
					</button>
				</div>
			</div>
		</div>
	);
}
