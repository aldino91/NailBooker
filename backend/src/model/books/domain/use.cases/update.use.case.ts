import { UpdateDto } from '../dtos/books/dtos.update.book';
import { RepositoryBooks } from '../repository.books';

export class UseCaseUpdateBook {
	constructor(public readonly repository: RepositoryBooks) {}

	async execute(updateDto: UpdateDto) {
		return await this.repository.updatedBook(updateDto);
	}
}
