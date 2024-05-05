import express, { Router } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import prisma from '../model/users/data/postgres';
import path from 'path';

export class Server {
	public readonly app = express();
	private readonly port: number;
	private serverListener?: any;
	private readonly routes: Router;

	constructor(port: number, routes: Router) {
		this.port = port;
		this.routes = routes;
	}

	async start() {
		this.app.use(cors());

		this.app.use(express.json());

		this.app.use(express.urlencoded({ extended: true }));

		this.app.use(express.static(path.join(__dirname, 'public')));

		this.app.use(this.routes!);

		this.serverListener = this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}

	public close() {
		this.serverListener?.close();
	}
}
