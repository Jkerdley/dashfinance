export const getCurrencyAsync = async () => {
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			'X-API-KEY': import.meta.env.VITE_COINS_API,
		},
	};
	return await fetch('https://openapiv1.coinstats.app/fiats', options)
		.then((res) => res.json())
		.then((response) => {
			return response;
		})
		.catch((err) => console.error(err));
};
