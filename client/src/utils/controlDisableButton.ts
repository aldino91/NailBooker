export const controlDisableButton = (
	disableButton: boolean,
	status: string
): boolean => {
	if (disableButton) {
		if (status === 'selected') {
			return false;
		}
		if (status === 'occupato') {
			return true;
		}

		if (status === 'disponible') {
			return true;
		}
	}
	if (disableButton === false) {
		if (status === 'occupato') {
			return true;
		}

		if (status === 'disponible') {
			return false;
		}
	}

	return false;
};
