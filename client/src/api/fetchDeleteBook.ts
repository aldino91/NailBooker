import axios from 'axios';

export const fetchDeleteBook = async (id: string) => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.delete(`${apiUrl}/book-delete/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				withCredentials: true,
			},
		});
		return response;
	} catch (error) {
		console.log(error);

		return { data: 'Error al server, provi piú tardi, grazie...' };
	}
};
