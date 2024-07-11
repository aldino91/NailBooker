import { Server } from './server/server';
import { envs } from './config/envs';
import { AppRoutes } from './server/routes';

(async () => {
	main();
})();

async function main() {
	const server = new Server(envs.PORT || 3000, AppRoutes.routes);

	server.start();
}
