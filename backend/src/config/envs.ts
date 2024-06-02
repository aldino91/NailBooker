import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	JWT_SEED: get('JWT_SEED').required().asString(),
	MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
	MAILER_MAIL: get('MAILER_MAIL').required().asString(),
	MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
	WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),
	COOKIES_SECURE: get('COOKIES_SECURE').required().asBool(),
};
