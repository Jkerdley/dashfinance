import { addPost, updatePost } from '../api';
import { ROLES } from '../constants';
import { sessions } from '../sessions';

export const savePost = async (hash, newPostData) => {
	const accesRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accesRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}

	const savedPost =
		newPostData.id === ''
			? await addPost(newPostData)
			: await updatePost(newPostData);
	return {
		error: null,
		response: savedPost,
	};
};
