import { Request, Response } from 'express';
import { RepositoryBooks } from '../domain/repository.books';
import { CreatedDto } from '../domain/dtos/books/dtos.created.book';
import { UseCaseCreatedBook } from '../domain/use.cases/created.use.case';
import prisma from '../../../postgres';
import { UseCaseGetByIdBook } from '../domain/use.cases/getById.use.case';
import { UseCaseGetAllBooks } from '../domain/use.cases/getAllBooks.use.case';
import { UseCaseDeleteById } from '../domain/use.cases/deleteById.use.case';
import { UseCaseUpdateBook } from '../domain/use.cases/update.use.case';
import { UpdateDto } from '../domain/dtos/books/dtos.update.book';

export class BooksController {
	constructor(public readonly booksRepository: RepositoryBooks) {}

	create = async (req: Request, res: Response) => {
		const dto = CreatedDto.create(req.body);

		new UseCaseCreatedBook(this.booksRepository)
			.execute(dto)
			.then((resp) => {
				return res.status(200).json(resp);
			})
			.catch((err) => {
				return res.status(500).json(err);
			});
	};

	getAllBooks = async (req: Request, res: Response) => {
		const idUser = req.body.idUser;
		new UseCaseGetAllBooks(this.booksRepository)
			.execute(idUser)
			.then((resp) => {
				return res.status(200).json(resp);
			})
			.catch((err) => {
				return res.status(500).json(err);
			});
	};

	getById = async (req: Request, res: Response) => {
		const id = req.body.id;
		new UseCaseGetByIdBook(this.booksRepository)
			.execute(id)
			.then((resp) => {
				return res.status(200).json(resp);
			})
			.catch((err) => {
				return res.status(500).json(err);
			});
	};

	deleteById = async (req: Request, res: Response) => {
		const id = req.body.id;

		new UseCaseDeleteById(this.booksRepository)
			.execute(id)
			.then((resp) => {
				return res.status(200).json(resp);
			})
			.catch((err) => {
				return res.status(500).json(err);
			});
	};

	updated = async (req: Request, res: Response) => {
		const { err, data } = UpdateDto.create(req.body);

		if (err) res.status(500).json(err);

		new UseCaseUpdateBook(this.booksRepository)
			.execute(data!)
			.then((resp) => {
				return res.status(200).json(resp);
			})
			.catch((err) => {
				return res.status(500).json(err);
			});
	};
}
