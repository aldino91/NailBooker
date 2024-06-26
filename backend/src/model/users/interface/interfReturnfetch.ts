import { ErrorUserBase } from '../../../errors/users/user.base.error';
import { Users } from '../domain/entity.users';

interface IntReturnRegisterUser {
	error?: string | undefined;
	user?: Users | undefined;
}

export default IntReturnRegisterUser;
