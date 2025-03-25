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
		console.log('data in crypto async', data);
		return data;
	} catch (error) {
		console.error(error);
	}
};

// import { coinsResponseTransformer } from '../transformers/CoinsResponseTransformer';

// export const getCryptoCoinsAsync = async () => {
// 	const URL =
// 		'https://api.cryptorank.io/v2/currencies?fiat=RUB&include=percentChange&sortBy=rank&sortDirection=ASC&limit=100&skip=0';
// 	const options = {
// 		method: 'GET',
// 		headers: {
// 			accept: 'application/json',
// 			'X-Api-Key': import.meta.env.VITE_CRYPTORANK_COINS_API,
// 		},
// 	};
// 	try {
// 		const response = await fetch(URL, options);
// 		const responseData = await response.json();
// 		console.log('responseData in crypto async', responseData);
// 		const mappedData = coinsResponseTransformer(responseData);
// 		console.log('mappedData in crypto async', mappedData);
// 		return mappedData;
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
