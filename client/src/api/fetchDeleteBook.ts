import axios from 'axios';

export const fetchDeleteBook = async (id: string) => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.delete(`${apiUrl}/book-delete/${id}`);
		return response;
	} catch (error) {
		console.log(error);
	}
};
