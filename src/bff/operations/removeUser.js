import { deleteUser } from '../api';
import { ROLES } from '../constants';
import { sessions } from '../sessions';

export const removeUser = async (hash, userId) => {
	const accesRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accesRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}
	deleteUser(userId);
	return {
		error: null,
		response: true,
	};
};
