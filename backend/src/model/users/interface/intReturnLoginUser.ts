import { ErrorUserBase } from '../../../errors/users/user.base.error';
import { Users } from '../domain/entity.users';

interface IntReturnLoginUser {
	error?: ErrorUserBase | undefined;
	user?: Users | undefined;
	token?: string | undefined;
}

export default IntReturnLoginUser;
