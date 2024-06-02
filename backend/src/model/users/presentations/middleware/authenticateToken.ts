import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../../config/jwt.adapter';

const authenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.auth_token;

	if (!token) {
		return res.status(401).send({ error: 'Unauthorized' });
	}

	try {
		const userValidate = await JwtAdapter.validateToken(token);

		if (!userValidate) return res.status(401).send({ error: 'Unauthorized' });

		req.body = userValidate;

		next();
	} catch (error) {
		res.status(500).json('Error Token Authorization');
	}
};

export default authenticateToken;
