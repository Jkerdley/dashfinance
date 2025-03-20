export const getCryptoCoinsAsync = async () => {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'X-API-KEY': import.meta.env.VITE_COINS_API,
		},
	};
	try {
		const response = await fetch('https://openapiv1.coinstats.app/coins?limit=500&currency=RUB', options);
		const data = await response.json();
		console.log('data in crypto async', data);
		return data;
	} catch (error) {
		console.error(error);
	}
};
