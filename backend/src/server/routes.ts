import { Router } from 'express';
import { AuthRoutes } from '../model/users/presentations/routes';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api/auth/', AuthRoutes.routes);

		return router;
	}
}
