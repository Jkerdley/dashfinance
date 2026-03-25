export const getCryptoCoinsAsync = async () => {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'X-API-KEY': import.meta.env.VITE_COINS_API,
		},
	};
	try {
		const response = await fetch(
			'https://openapiv1.coinstats.app/coins?limit=1000&currency=RUB',
			options,
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};
