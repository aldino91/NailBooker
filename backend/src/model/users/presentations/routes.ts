import { Request, Response, Router } from 'express';
import { UserDataSourcesPostgresImpl } from '../Infrastructure/datasources/datasources.postgres';
import { UserRepositoryImpl } from '../Infrastructure/repository/repository.impl';
import { AuthController } from './Auth/auth.controller';
import { errorHandler } from './middleware/middleware.errorHandler';
import EmailService from './EmailService.ts/EmailService';
import { envs } from '../../../config/envs';
import { env } from 'process';
import prisma from '../../../postgres';
import authenticateToken from './middleware/authenticateToken';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		const emailService = new EmailService(
			envs.MAILER_SERVICE,
			envs.MAILER_MAIL,
			envs.MAILER_SECRET_KEY
		);

		const datasources = new UserDataSourcesPostgresImpl(emailService);

		const respository = new UserRepositoryImpl(datasources);

		const controller = new AuthController(respository);

		router.post('/auth/login', controller.login);

		router.post('/auth/register', controller.register);

		router.post('/auth/forgot-password', controller.forgotPassword);

		router.put('/auth/reset-password', controller.resetPassword);

		router.get('/auth/validate-email/:token', controller.validateEmail);

		router.delete('/auth', async (req: Request, res: Response) => {
			await prisma.users.deleteMany();

			res.status(200).json('Delete all users!');
		});

		router.post('/auth/resend-token', controller.resendToken);

		router.get(
			'/auth/protected-route',
			authenticateToken,
			controller.protectedRoute
		);

		router.use(errorHandler);

		return router;
	}
}
