export const updatePost = (newPostData) =>
	fetch(`http://localhost:3005/posts/${newPostData.id}`, {
		method: 'PATCH',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: newPostData.title,
			img_url: newPostData.imageUrl,
			content: newPostData.content,
		}),
	}).then((loadedPost) => loadedPost.json());
