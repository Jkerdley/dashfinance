import { deleteComment, deletePost, getComments } from '../api';
import { ROLES } from '../constants';
import { sessions } from '../sessions';

export const removePost = async (hash, postId) => {
	const accesRoles = [ROLES.ADMIN];

	const access = await sessions.access(hash, accesRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}
	await deletePost(postId);
	const comments = await getComments(postId);
	await Promise.all(comments.map(({ id }) => deleteComment(id)));

	return {
		error: null,
		response: true,
	};
};
