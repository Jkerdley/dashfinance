export const addPost = ({ imageUrl, title, content }) =>
	fetch('http://localhost:3005/posts', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			title: title,
			img_url: imageUrl,
			content: content,
			published_at: new Date().toLocaleDateString(),
		}),
	}).then((createdPost) => createdPost.json());
