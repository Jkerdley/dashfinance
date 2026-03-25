export const getCurrencyAsync = async () => {
	const URL = 'https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json?iss.meta=off';

	try {
		const response = await fetch(URL);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Ошибка получения курса USD', error);
	}
};
