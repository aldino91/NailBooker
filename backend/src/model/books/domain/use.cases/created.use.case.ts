import { CreatedDto } from '../dtos/books/dtos.created.book';
import { RepositoryBooks } from '../repository.books';

export class UseCaseCreatedBook {
	constructor(public readonly repository: RepositoryBooks) {}

	async execute(dto: CreatedDto) {
		return this.repository.create(dto);
	}
}
