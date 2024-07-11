import axios from 'axios';

axios.defaults.withCredentials = true;

interface DataLogin {
	email: string;
	password: string;
}

export const fetchLogin = async (data: DataLogin) => {
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
		return { data: 'Network error, please try again later.' };
	}
};
