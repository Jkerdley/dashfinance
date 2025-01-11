export const addComment = (userId, postId, content) => {
	return fetch('http://localhost:3005/comments', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			author_id: userId,
			post_id: postId,
			content: content,
			published_at: new Date().toLocaleDateString(),
		}),
	});
};
