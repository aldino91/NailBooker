import { Users } from '../entity.users';

export interface BasesUseCaseUsers<T> {
	execute: (dto: T) => Promise<Users>;
}
