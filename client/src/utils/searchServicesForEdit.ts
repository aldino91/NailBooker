import { servicesManicure, servicesPedicure } from './constants';

export const searchServicesForEdit = (
	listServices: string[]
): Array<{ services: string; type: string; duration: string }> => {
	const sumServices: Array<{
		services: string;
		type: string;
		duration: string;
	}> = [];

	for (let i = 0; i < listServices.length; i++) {
		const manicures = servicesManicure.find(
			(item) => item.services === listServices[i]
		);
		const pedicures = servicesPedicure.find(
			(item) => item.services === listServices[i]
		);

		if (pedicures !== undefined) {
			sumServices.push(pedicures);
		}

		if (manicures !== undefined) {
			sumServices.push(manicures);
		}
	}

	return sumServices;
};
