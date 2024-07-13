import axios from 'axios';

export const fetchForgotPassword = async (email: string) => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.post(`${apiUrl}/auth/forgot-password`, {
			email,
			headers: {
				'Content-Type': 'application/json',
				withCredentials: true,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
		return { status: 'error' };
	}
};
