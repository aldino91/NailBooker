import axios from 'axios';

// axios.defaults.withCredentials = true;

export const fecthRangeDateBooks = async (dateFrom: number, dateTo: number) => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.get(`${apiUrl}/books/range-date`, {
			params: { dateFrom, dateTo },
		});

		return response;
	} catch (error) {
		console.log(error);
	}
};
