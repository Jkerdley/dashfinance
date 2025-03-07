export const getCryptoCoinsAsync = async () => {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'X-API-KEY': import.meta.env.VITE_COINS_API,
		},
	};
	const response = await fetch('https://openapiv1.coinstats.app/coins?limit=500&currency=RUB', options)
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return response;
};
