import axios from 'axios';

axios.defaults.withCredentials = true;

export const fecthRangeDateBooks = async (dateFrom: string, dateTo: string) => {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_URL}/books/range-date`,
			{ data: { dateFrom, dateTo } }
		);

		return response;
	} catch (error) {
		console.log(error);
	}
};
