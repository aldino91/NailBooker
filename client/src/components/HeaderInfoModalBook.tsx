import { fromUnixTime } from 'date-fns';
import { formatDate } from '../utils/formateDate';
import { ModalData } from '../utils/interfaces';

interface Props {
	data: ModalData;
}

export default function HeaderInfoModalBook({ data }: Props): JSX.Element {
	const dayDate = fromUnixTime(data.day as number);
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
				<text>Ora: {data.hour}</text>
			</div>
			<div>
				<text>Stato: {data.status}</text>
			</div>
		</div>
	);
}
