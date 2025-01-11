export const setNewUserRole = (iserId, roleId) =>
	fetch(`http://localhost:3005/users/${iserId}`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			role_id: roleId,
		}),
	});
