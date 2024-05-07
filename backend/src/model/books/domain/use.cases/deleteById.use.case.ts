import { RepositoryBooks } from '../repository.books';

export class UseCaseDeleteById {
	constructor(private readonly repository: RepositoryBooks) {}

	async execute(id: string) {
		return await this.repository.deleteBook(id);
	}
}
