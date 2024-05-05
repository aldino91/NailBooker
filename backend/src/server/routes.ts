import { Router } from 'express';
import { AuthRoutes } from '../model/users/presentations/routes';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api', AuthRoutes.routes);

		return router;
	}
}
