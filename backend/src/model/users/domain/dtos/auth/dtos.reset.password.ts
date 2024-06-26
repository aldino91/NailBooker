export class ResetetPassowrdUserDto {
	static create(
		id: string,
		password: string
	): { error?: string; id?: string; password?: string } {
		if (!id) return { error: 'Missing ID...' };
		if (!password) return { error: 'Missing Password...' };
		if (password.length < 6) return { error: 'Password to short...' };

		return { error: undefined, id: id, password: password };
	}
}
