import { addSession, getSession, deleteSession } from './api';

export const sessions = {
	create(user) {
		const hash = Math.random().toFixed(50);

		addSession(hash, user);
		return hash;
	},

	async remove(hash) {
		const session = await getSession(hash);
		if (!session) {
			return;
		}
		deleteSession(session.id);
	},
	async access(hash, haveAccessRoles) {
		const dbSession = await getSession(hash);

		return dbSession?.user && haveAccessRoles.includes(dbSession.user.roleId);
	},
};

// access(sessionId, allowedRoles) {
// 	const userData = this.list[sessionId];
// 	return userData && allowedRoles.includes(userData.roleId);
// },
