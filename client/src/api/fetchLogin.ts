import axios from 'axios';

axios.defaults.withCredentials = true;

interface DataLogin {
	email: string;
	password: string;
}

export const fetchLogin = async (data: DataLogin) => {
	console.log('Data passati per il register => ', data);
	try {
		const apiUrl = import.meta.env.VITE_API_URL;

		console.log('API URL =>', apiUrl);
		const response = await axios.post(`${apiUrl}/auth/login`, data, {
			headers: {
				'Content-Type': 'application/json',
				withCredentials: true,
			},
		});

		console.log('Risposta del LOGIN => ', response);
		return response;
	} catch (error) {
		console.log('Error fetch LOGIN => ', error);
		return { data: 'Network error, please try again later.' };
	}
};
