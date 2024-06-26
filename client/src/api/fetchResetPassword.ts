import axios from 'axios';

export interface DataResetPassword {
	id: string;
	confirm: string;
}

export const fetchResetPassword = async (data: DataResetPassword) => {
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_API_URL}/auth/reset-password`,
			data
		);
		return response.data;
	} catch (error) {
		console.log(error);
		return {
			data: 'Abbiamo problemi con il server, provi piú tardi. Grazie.',
			status: 'error',
		};
	}
};
