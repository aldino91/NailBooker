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
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/books-created`,
			data
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};
