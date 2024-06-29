import { Services } from '../presentation/components/BodyEditBook';

export const arrayServices = (listServices: Services[] | undefined) => {
	let sumServices: string[] = [];

	if (listServices) {
		for (let i = 0; i < listServices.length; i++) {
			sumServices.push(listServices[i].services);
		}
	} else {
		sumServices = [''];
	}

	return sumServices;
};
