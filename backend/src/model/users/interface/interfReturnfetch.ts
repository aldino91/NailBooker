import { ErrorUserBase } from '../../../errors/users/user.base.error';
import { Users } from '../domain/entity.users';

interface IntReturnRegisterUser {
	error?: ErrorUserBase | undefined;
	user?: Users | undefined;
}

export default IntReturnRegisterUser;
