import { RepositoryBooks } from '../repository.books';

export class UseRangeDateBooks {
	constructor(readonly repository: RepositoryBooks) {}

	async execute(dateFrom: number, dateTo: number, id: string) {
		return await this.repository.rangeDateBooks(dateFrom, dateTo, id);
	}
}
