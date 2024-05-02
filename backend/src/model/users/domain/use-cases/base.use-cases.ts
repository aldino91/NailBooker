import { CustomError } from '../../../../errors/users/user.not.found.error';
import InterfaceReturnFetch from '../../interface/interfReturnfetch';
import { Users } from '../entity.users';

export interface BasesUseCaseUsers<T> {
	execute: (dto: T) => Promise<InterfaceReturnFetch>;
}
