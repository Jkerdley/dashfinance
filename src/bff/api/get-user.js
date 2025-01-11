import { transformUser } from './transformers';

export const getUser = async (loginToFind) => {
	return await fetch(`http://localhost:3005/users/?login=${loginToFind}`)
		.then((loadedUser) => loadedUser.json())
		.then(([loadedUser]) => loadedUser && transformUser(loadedUser));
};

// import { getUsers } from './get-users';

// export const getUser = async (loginToFind) => {
// 	const users = await getUsers();
// 	return users.find((user) => user.login === loginToFind);
// };

// return users.find((login) => login === loginToFind);
