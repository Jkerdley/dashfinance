import { calculateValueInCurrency } from './calculateValueInCurrency';

interface HistoryItem {
	amount?: string | number;
	checkSumm?: string | number;
	[key: string]: any;
}

const parseToNumber = (val?: string | number): number => {
	if (typeof val === 'number') return val;
	if (!val) return 0;
	return parseFloat(String(val).replace(/[^\d.-]/g, '')) || 0;
};

export const getHIstoryInCurrency = <T extends HistoryItem>(
	historyArray: T[],
	isUSD: boolean,
	rubleCourse: number,
): T[] => {
	const historyInCurrency = historyArray.map((operation) => {
		const rawValue = operation.amount !== undefined ? operation.amount : operation.checkSumm || 0;

		return {
			...operation,
			amount: calculateValueInCurrency(parseToNumber(rawValue), isUSD, rubleCourse),
		};
	});

	return historyInCurrency as T[];
};
