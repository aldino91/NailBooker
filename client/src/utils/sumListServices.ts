import { Services } from '../presentation/components/BodyEditBook';

export const sumListServices = (
	selectedServices: Services[] | undefined
): string[] => {
	let listServices: string[] = [];

	if (selectedServices) {
		for (let i = 0; i < selectedServices.length; i++) {
			listServices.push(selectedServices[i].services);
		}
	}

	return listServices;
};
