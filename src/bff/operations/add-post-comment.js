import { addComment, getPost } from '../api';
import { ROLES } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const addPostComment = async (hash, userId, postId, content) => {
	const accesRoles = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.READER];

	const access = await sessions.access(hash, accesRoles);
	if (!access) {
		return {
			error: 'Доступ запрещен',
			response: null,
		};
	}
	await addComment(userId, postId, content);
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
