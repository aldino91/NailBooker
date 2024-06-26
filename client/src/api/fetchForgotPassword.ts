import axios from 'axios';

export const fetchForgotPassword = async (email: string) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/auth/forgot-password`,
			{
				email,
			}
		);

		return response.data;
	} catch (error) {
		console.log(error);
		return { status: 'error' };
	}
};
