import { setNewUserRole } from '../api';
import { ROLES } from '../constants';
import { sessions } from '../sessions';

export const updateUserRole = async (hash, userId, userNewRoleId) => {
	const accesRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accesRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}
	await setNewUserRole(userId, userNewRoleId);
	return {
		error: null,
		response: true,
	};
};
