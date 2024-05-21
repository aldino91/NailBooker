export function sumHours(listHours: Array<{ time: string }>) {
	let newHour = '00:00';

	for (let i = 0; i < listHours.length; i++) {
		var [horas1, minutos1] = newHour.split(':').map(Number);
		var [horas2, minutos2] = listHours[i].time.split(':').map(Number);

		var totalMinutos = minutos1 + minutos2;

		var totalHoras = horas1 + horas2;

		if (totalMinutos >= 60) {
			totalMinutos -= 60;
			totalHoras++;
		}

		newHour =
			totalHoras.toString().padStart(2, '0') +
			':' +
			totalMinutos.toString().padStart(2, '0');
	}
	return newHour;
}
