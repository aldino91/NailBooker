import { fromUnixTime } from 'date-fns';
import { useReservationStore } from '../../infrastructure/store/reservationsStore';
import { formatDate } from '../../utils/formateDate';

export default function HeaderInfoModalBook(): JSX.Element {
	const { bookSelected } = useReservationStore();
	const dayDate = fromUnixTime(bookSelected?.dayBook as number);

	const day = formatDate(dayDate.toISOString());

	return (
		<div className="flex-col items-start justify-between px-2 rounded-t order-1 h-1/6">
			<div>
				<h3 className="text-3xl font-semibold">Prenotazione</h3>
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
		</div>
	);
}
