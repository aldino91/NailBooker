import { Books } from '../domain/entities/Books';
import { fromStringToNum } from './fromStringToNum';
import { ListBook, ModalData } from './interfaces';
import { sumHours } from './sumHours';
import { sumListServices } from './sumListServices';

interface Props {
	bookAvalable: Books[] | undefined;
	showModal: ModalData;
	dataAddList: any;
	id: string;
	name: string;
	usersId: string;
	selectedServices: Array<{ [key: string]: string }>;
}

export const createdBooking = ({
	bookAvalable,
	showModal,
	dataAddList,
	id,
	name,
	usersId,
	selectedServices,
}: Props): Books[] => {
	if (bookAvalable) {
		for (let i = 0; i < bookAvalable.length; i++) {
			if (bookAvalable[i].hourBook === showModal.hour) {
				bookAvalable[i] = dataAddList;
				const durationBook = fromStringToNum(bookAvalable[i].duration);

				for (let j = i; j < i + durationBook && j < bookAvalable.length; j++) {
					bookAvalable[j] = {
						hourBook: bookAvalable[j].hourBook,
						reservarName: name,
						services: sumListServices(selectedServices),
						duration: sumHours(selectedServices),
						dayBook: showModal?.day!,
						usersId: usersId,
						available: false,
						status: 'occupato',
						time: '00:00',
						start: bookAvalable[i].hourBook,
						id: id,
					};
				}
			}
		}
	}

	return bookAvalable as Books[];
};
