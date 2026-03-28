export const calculateValueInCurrency = (dataset: number, isUSD: boolean, rubleCourse: number): string => {
	return isUSD ? '$ ' + (dataset / rubleCourse).toFixed(2) : '\u20bd ' + dataset.toFixed(2);
};
