import { RepositoryBooks } from '../repository.books';

export class UseCaseGetByIdBook {
	constructor(public readonly repository: RepositoryBooks) {}

	async execute(id: string) {
		return this.repository.getById(id);
	}
}
