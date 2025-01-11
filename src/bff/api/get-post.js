import { transformPost } from './transformers';
export const getPost = async (postId) =>
	await fetch(`http://localhost:3005/posts/${postId}`)
		.then((response) => {
			if (response.ok) {
				return response;
			}
			const error =
				response.status === 404
					? 'Такая страница не существует'
					: 'Произошла ошибка при получении страницы';

			return Promise.reject(error);
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost));
