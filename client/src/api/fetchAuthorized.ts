import axios from 'axios';

axios.defaults.withCredentials = true;

export const fetchAuthorized = async (isNotAuth: string = '') => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.get(`${apiUrl}/auth/protected-route`);

		return response;
	} catch (error) {
		console.log(error);
		window.location.href = `/${isNotAuth}`;

		return { data: 'Is not authorized...' };
	}
};
