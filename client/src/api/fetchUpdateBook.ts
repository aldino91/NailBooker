import axios from 'axios';

axios.defaults.withCredentials = true;

export interface DataUpdate {
	reservarName: string;
	dayBook: number;
	hourBook: string;
	services: string[] | undefined;
	duration: string;
	id: string;
}

export const fetchUpdateBook = async (data: DataUpdate) => {
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_API_URL}/book-update`,
			data
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};
