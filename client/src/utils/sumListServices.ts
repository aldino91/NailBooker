export const sumListServices = (
	selectedServices: Array<{ [key: string]: string }>
): string[] => {
	let listServices: string[] = [];

	for (let i = 0; i < selectedServices.length; i++) {
		listServices.push(selectedServices[i].services);
	}

	return listServices;
};
