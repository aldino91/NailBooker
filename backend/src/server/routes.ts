import { Router } from 'express';
import { AuthRoutes } from '../model/users/presentations/routes';
import { BooksRoutes } from '../model/books/presentations/routes';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api', AuthRoutes.routes);

		router.use('/api', BooksRoutes.routes);

		return router;
	}
}
