import { ErrorUserBase } from '../../../errors/users/user.base.error';
import { Users } from '../domain/entity.users';

interface InterfaceReturnUser {
	error?: ErrorUserBase | undefined;
	user?: Users | undefined;
}

export default InterfaceReturnUser;
