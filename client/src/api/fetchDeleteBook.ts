import axios from 'axios';

export const fetchDeleteBook = async (id: string) => {
	try {
		const response = await axios.delete(
			`${import.meta.env.VITE_API_URL}/book-delete/${id}`
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};
