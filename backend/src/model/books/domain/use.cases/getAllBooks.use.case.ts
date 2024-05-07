import { RepositoryBooks } from '../repository.books';

export class UseCaseGetAllBooks {
	constructor(public readonly repository: RepositoryBooks) {}

	async execute(idUser: string) {
		return await this.repository.getAllBooks(idUser);
	}
}
