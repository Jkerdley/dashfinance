export async function request(url, method = 'GET', data) {
	try {
		const response = await fetch('http://localhost:3007/api' + url, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: method,
			credentials: 'include',
			body: data ? JSON.stringify(data) : undefined,
		});
		console.log('response in login request', response);

		if (!response.ok) {
			throw new Error(
				`Ошибка! Статус: ${response.status} Проверьте правильность ввода пароля и логина`,
			);
		}

		const serverData = await response.json();
		console.log('serverData', serverData);
		return serverData;
	} catch (error) {
		console.error('Ошибка при выполнении запроса:', error);
		throw error;
	}
}
