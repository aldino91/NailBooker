import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../../../config/jwt.adapter';

const authenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies.auth_token;

	if (!token || token === undefined) {
		return res.status(200).json({ error: 'Unauthorized' });
	}

	try {
		const userValidate = await JwtAdapter.validateToken(token);

		if (!userValidate) return res.status(200).json({ error: 'Unauthorized' });

		req.body = userValidate;

		next();
	} catch (error) {
		// res.status(500).json('Error internal server Token Authorization...');

		return res.json({ error: 'Error internal server Token Authorization...' });
	}
};

export default authenticateToken;
