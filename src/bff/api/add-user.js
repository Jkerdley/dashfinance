import { generateDate } from '../utils';
export const addUser = (login, password) =>
	fetch('http://localhost:3005/users', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			login,
			password,
			role_id: 2,
			registered_at: generateDate(),
		}),
	}).then((createdUser) => createdUser.json());
