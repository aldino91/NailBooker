import AvailableHours, {
	filterAvalableHours,
} from '../components/AvailableHours';
import BaseLayout from '../components/BaseLayout';
import FormCalendar from '../components/FormCalendar';
import HeaderBar from '../components/HeaderBar';
import { bgColorDefault } from '../utils/constants';

export default function Calendar(): JSX.Element {
	return (
		<BaseLayout>
			<HeaderBar title="Calendario" href="reserved" />
			<div className="flex flex-col space-y-8 py-6">
				<FormCalendar />
				<AvailableHours />
				<div className="w-full flex flex-row justify-center px-3">
					<button
						className={`w-full p-2 rounded-3xl ${bgColorDefault}  text-white`}
						onClick={() => filterAvalableHours()}
					>
						Conferma
					</button>
				</div>
			</div>
		</BaseLayout>
	);
}
