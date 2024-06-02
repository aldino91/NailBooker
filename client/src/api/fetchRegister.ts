import axios from 'axios';

export const fetchRegister = async (data: any) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/auth/register`,
			data
		);
		return response.data;
	} catch (error) {
		console.error('Error registrando el usuario:', error);
		throw error;
	}
};
