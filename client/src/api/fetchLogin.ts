import axios from 'axios';

axios.defaults.withCredentials = true;

interface DataLogin {
	email: string;
	password: string;
}

export const fetchLogin = async (data: DataLogin) => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.post(`${apiUrl}/auth/login`, data, {
			headers: {
				'Content-Type': 'application/json',
				withCredentials: true,
			},
		});

		return response;
	} catch (error) {
		return { data: 'Network error, please try again later.' };
	}
};
