import { transformUser } from './transformers';

export const getUsers = () =>
	fetch('http://localhost:3005/users')
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && loadedUsers.map(transformUser));

// export const getUsers = async (loginToFind) => {
// 	const users = await fetch('http://localhost:3005/users').then((loadedUsers) =>
// 		loadedUsers.json(),
// 	);
// 	return users.find((user) => user.login === loginToFind);
// };
