import { calculateValueInCurrency } from './calculateValueInCurrency';

export const getHIstoryInCurrency = (historyArray, isUSD, rubleCourse) => {
	const historyInCurrency = historyArray.map((operation) => ({
		...operation,
		amount: calculateValueInCurrency(operation.amount || operation.checkAmount, isUSD, rubleCourse),
	}));
	return historyInCurrency;
};
