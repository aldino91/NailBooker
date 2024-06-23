import { fromUnixTime } from 'date-fns';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';
import { formatDate } from '../../utils/formateDate';
import IconCollapse from '../../components/IconCollapse';

interface Props {
	close: boolean;
	setClose: (ard: boolean) => void;
}

export default function HeaderInfoModalEdit({
	close,
	setClose,
}: Props): JSX.Element {
	const { bookSelected } = useReservationStore();

	const dayDate = fromUnixTime(bookSelected?.dayBook as number);
	const day = formatDate(dayDate.toISOString());
	return (
		<div className="flex flex-col px-3 space-y-4">
			<div>
				<h3 className="text-3xl font-semibold">Aggiorna prenotazione</h3>
			</div>
			<div className="flex flex-row justify-between items-center w-full">
				<div className="flex-col items-start justify-between rounded-t w-3/4">
					<div>
						<text>Nome: {bookSelected?.reservarName?.toLocaleUpperCase()}</text>
					</div>
					<div>
						<text>Giorno: {day}</text>
					</div>
					<div>
						<text>Ora: {bookSelected?.hourBook}</text>
					</div>
					<div>
						<text>Stato: {bookSelected?.status}</text>
					</div>
					<div>
						<text>Durata: {bookSelected?.duration}</text>
					</div>
					<div>
						<text>Inizio: {bookSelected?.start}</text>
					</div>
					<div>
						<text>Servizzi: </text>
					</div>
					<div>
						{bookSelected?.services?.map((service, i) => {
							return <div key={i}>- {service} </div>;
						})}
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
