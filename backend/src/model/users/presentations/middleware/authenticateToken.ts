import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../../config/jwt.adapter';

const authenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(401);

	try {
		const userValidate = await JwtAdapter.validateToken(token);

		if (!userValidate) res.status(401).json('Unauthorized');

		next();
	} catch (error) {
		res.status(500).json('Error Token Authorization');
	}
};

export default authenticateToken;
