import { Router } from 'express';
import { envs } from '../../../config/envs';
import EmailService from '../../users/presentations/EmailService.ts/EmailService';
import { BooksController } from './books.controller';
import { errorHandler } from '../../users/presentations/middleware/middleware.errorHandler';
import { DatasourcesBooksPostegresImpl } from '../infrastructure/datasources/datasources.postgres';
import authenticateToken from '../../users/presentations/middleware/authenticateToken';

export class BooksRoutes {
	static get routes(): Router {
		const router = Router();

		const emailService = new EmailService(
			envs.MAILER_SERVICE,
			envs.MAILER_MAIL,
			envs.MAILER_SECRET_KEY
		);

		const datasources = new DatasourcesBooksPostegresImpl(emailService);

		const controller = new BooksController(datasources);

		router.post('/books-created', controller.create);

		router.get('/all-books', controller.getAllBooks);

		router.get('/books', controller.getById);

		router.get('/books/range-date', controller.rangeDate);

		router.delete('/book-delete/:id', controller.deleteById);

		// router.put('/book-update', authenticateToken, controller.updated);

		router.put('/book-update', controller.updated);

		router.use(errorHandler);

		return router;
	}
}
