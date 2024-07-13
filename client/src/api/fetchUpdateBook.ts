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
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.put(`${apiUrl}/book-update`, data, {
			headers: {
				'Content-Type': 'application/json',
				withCredentials: true,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};
