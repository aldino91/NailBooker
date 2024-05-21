export const fromStringToNum = (cadena: string) => {
	const [hours, minutes] = cadena.split(':').map(Number);

	const totalMinutes = hours * 60 + minutes;

	const halfHours = totalMinutes / 30;

	return halfHours;
};
