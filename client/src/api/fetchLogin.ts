import axios from 'axios';

axios.defaults.withCredentials = true;

export const fetchLogin = async (data: any) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/auth/login`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return response;
	} catch (error) {
		return { data: 'user not found, make sure you are registered' };
	}
};
