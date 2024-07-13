import axios from 'axios';

export interface DataResetPassword {
	id: string;
	confirm: string;
}

export const fetchResetPassword = async (data: DataResetPassword) => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.put(`${apiUrl}/auth/reset-password`, data);
		return response.data;
	} catch (error) {
		console.log(error);
		return {
			data: 'Abbiamo problemi con il server, provi piú tardi. Grazie.',
			status: 'error',
		};
	}
};
