import { describe, it, expect, vi } from 'vitest';
import { fetchLogin } from './fetchLogin';
import axios from 'axios';

describe('fetchLogin - Integración', () => {
	it('debe retornar una respuesta exitosa cuando las credenciales son correctas', async () => {
		const response = await fetchLogin({
			email: 'aldobrunet@icloud.com',
			password: '12345678',
		});

		expect(response.data).toHaveProperty('message', 'Login successful');
	});

	it('debe retornar un mensaje de error de email no valido', async () => {
		const response = await fetchLogin({ email: 'wrong', password: 'wrong' });
		expect(response.data).toHaveProperty('error', 'Email is not valid');
	});

	it('debe retornar un mensaje de error de password o email no valido', async () => {
		const response = await fetchLogin({
			email: 'aldobrunet@icloud.com',
			password: 'wrong',
		});
		expect(response.data).toHaveProperty(
			'error',
			'Email or Password is not valid!'
		);
	});

	it('debe retornar un mensaje de error missing email', async () => {
		const response = await fetchLogin({
			email: '',
			password: 'wrong',
		});
		expect(response.data).toHaveProperty('error', 'Missing email');
	});

	it('debe retornar un mensaje de error missing password', async () => {
		const response = await fetchLogin({
			email: 'aldobrunet@icloud.com',
			password: '',
		});
		expect(response.data).toHaveProperty('error', 'Missing password');
	});

	it('debe simular un error de conexión', async () => {
		vi.spyOn(axios, 'post').mockRejectedValue(new Error('Network Error'));

		const response = await fetchLogin({
			email: 'aldobrunet@icloud.com',
			password: '12345678',
		});

		expect(response.data).toBe('Network error, please try again later.');

		vi.restoreAllMocks();
	});
});
