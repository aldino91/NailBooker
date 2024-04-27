import { Router } from 'express';
import { UserDataSourcesPostgresImpl } from '../Infrastructure/datasources/datasources.postgres';
import { UserRepositoryImpl } from '../Infrastructure/repository/repository.impl';
import { AuthController } from './Auth/auth.controller';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();
		const datasources = new UserDataSourcesPostgresImpl();

		const respository = new UserRepositoryImpl(datasources);

		const controller = new AuthController(respository);

		router.post('/login', controller.login);
		router.post('/register', controller.register);
		router.get('/validate-email/:token', controller.validateEmail);

		return router;
	}
}
