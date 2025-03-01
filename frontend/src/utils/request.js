export async function request(url, method = 'GET', data) {
	try {
		const response = await fetch('http://localhost:3005/api' + url, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: method,
			credentials: 'include',
			body: data ? JSON.stringify(data) : undefined,
		});

		if (!response.ok) {
			throw new Error(`HTTP ошибка! Статус: ${response.status}`);
		}

		const serverData = await response.json();
		return serverData;
	} catch (error) {
		console.error('Ошибка при выполнении запроса:', error);
		throw error;
	}
}
