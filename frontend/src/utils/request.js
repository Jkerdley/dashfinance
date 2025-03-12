export async function request(url, method = 'GET', data) {
	try {
		const response = await fetch('/api' + url, {
			headers: {
				'Content-Type': 'application/json',
			},
			method: method,
			credentials: 'include',
			body: data ? JSON.stringify(data) : undefined,
		});

		const serverData = await response.json();

		if (!response.ok) {
			throw new Error(serverData.error || `Ошибка! Статус: ${response.status}`);
		}

		return serverData;
	} catch (error) {
		console.error('Ошибка при выполнении запроса:', error);
		throw error;
	}
}
