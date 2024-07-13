import axios from 'axios';
import LocalStorageHelper from '../utils/localStorage';

export const fecthRangeDateBooks = async (dateFrom: number, dateTo: number) => {
	const localStorage = new LocalStorageHelper();
	const id = localStorage.load('userId');
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.get(`${apiUrl}/books/range-date`, {
			params: { dateFrom, dateTo, id },
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};
