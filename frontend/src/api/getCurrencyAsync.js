// export const getCurrencyAsync = async () => {
// 	const options = {
// 		method: 'GET',
// 		headers: {
// 			accept: 'application/json',
// 			'X-API-KEY': import.meta.env.VITE_COINS_API,
// 		},
// 	};
// 	try {
// 		const response = await fetch('https://openapiv1.coinstats.app/fiats', options);
// 		const data = response.json();
// 		console.log('data', data);
// 		return data;
// 	} catch (error) {
// 		console.log('Ошибка получения курса валют', error);
// 	}
// };

export const getCurrencyAsync = async () => {
	const URL = 'https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json?iss.meta=off';

	try {
		const response = await fetch(URL);
		const data = await response.json();
		console.log('data', data);
		return data;
	} catch (error) {
		console.log('Ошибка получения курса USD', error);
	}
};
