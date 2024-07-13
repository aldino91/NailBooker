import axios from 'axios';

axios.defaults.withCredentials = true;

export interface DataCreatedBook {
	reservarName: string;
	dayBook: number;
	hourBook: string;
	services: string[];
	duration: string;
	usersId: string;
}

export const fetchCreatedBookings = async (data: DataCreatedBook) => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.post(`${apiUrl}/books-created`, data, {
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
