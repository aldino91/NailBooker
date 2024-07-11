import { describe, it, expect } from 'vitest';

import { DataRegister, fetchRegister } from './fetchRegister';

describe('Test fetch register - integracion', () => {
	const dataRegister: DataRegister = {
		name: 'Luca',
		surname: 'Rossi',
		phoneNumber: '5673930456',
		email: 'lucarossi@l.com',
		password: '12345678',
		emailValidated: false,
		role: 'admin',
	};

	it('debe de tornar una respuesta exitosa', async () => {
		const response = await fetchRegister(dataRegister);

		const user = response.user;

		const isDataRegister = (user: any): user is DataRegister => {
			return (
				typeof user.name === 'string' &&
				typeof user.surname === 'string' &&
				typeof user.phoneNumber === 'string' &&
				typeof user.email === 'string' &&
				typeof user.password === 'string' &&
				typeof user.emailValidated === 'boolean' &&
				typeof user.role === 'string' &&
				typeof user.createdAt === 'string' &&
				typeof user.updatedAt === 'string'
			);
		};

		expect(isDataRegister(user)).toBe(true);
	});

	it('debe de tornar un error, usuario ya existe', async () => {
		const response = await fetchRegister(dataRegister);

		expect(response).toHaveProperty('error', 'The user already exists!');
	});
});
