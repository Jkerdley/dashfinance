export const calculateValueInCurrency = (dataset, isUSD, rubleCourse) => {
	dataset.toFixed(2);
	return isUSD ? '$ ' + (dataset / rubleCourse).toFixed(2) : '\u20bd ' + dataset.toFixed(2);
};
