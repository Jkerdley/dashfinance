import { getRoles } from '../api';
import { sessions } from '../sessions';
import { ROLES } from '../constants';

export const fetchUserRoles = async (hash) => {
	const accesRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accesRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	const roles = await getRoles();
	return {
		error: null,
		response: roles,
	};
};

// export const fetchUserRoles = async (sessionId) => {
// 	const haveAccessRoles = [ROLES.ADMIN];

// 	if (!sessionId) {
// 		return {
// 			error: 'Доступ запрещен',
// 			response: null,
// 		};
// 	}

// 	const userData = sessions.list[sessionId];

// 	if (!sessions.access(sessionId, haveAccessRoles)) {
// 		return {
// 			error: 'Доступ запрещен',
// 			response: null,
// 		};
// 	}

// 	const roles = await getRoles();
// 	return {
// 		error: null,
// 		response: roles,
// 	};
// };
