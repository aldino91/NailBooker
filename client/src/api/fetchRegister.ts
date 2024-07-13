import axios from 'axios';

export interface DataRegister {
	name: string;
	surname: string;
	phoneNumber: string;
	email: string;
	password: string;
	emailValidated: boolean;
	role: string;
	createdAt?: string;
	updatedAt?: string;
}

export const fetchRegister = async (data: DataRegister) => {
	try {
		const apiUrl = import.meta.env.VITE_API_URL;
		const response = await axios.post(`${apiUrl}/auth/register`, data, {
			headers: {
				'Content-Type': 'application/json',
				withCredentials: true,
			},
		});

		console.log('Response register  => ', response.data);
		return response.data;
	} catch (error) {
		console.error('Error registrando el usuario:', error);
		throw error;
	}
};
