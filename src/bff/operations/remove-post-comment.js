import { deleteComment, getPost } from '../api';
import { ROLES } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const removePostComment = async (hash, postId, id) => {
	const accesRoles = [ROLES.ADMIN, ROLES.MODERATOR];

	const access = await sessions.access(hash, accesRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}
	await deleteComment(id);
	const post = await getPost(postId);

	const commentsWithAuthor = await getPostCommentsWithAuthor(postId);
	return {
		error: null,
		response: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
