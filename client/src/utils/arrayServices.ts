import { ListBook } from './interfaces';

export const arrayServices = (
	listServices: {
		[key: string]: string;
	}[]
): Array<string> => {
	const sumServices: string[] = [];

	for (let i = 0; i < listServices.length; i++) {
		sumServices.push(listServices[i].services);
	}

	return sumServices;
};
