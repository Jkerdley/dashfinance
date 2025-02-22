export const trimAndReverseMoneyValue = (data) => {
	const dotIndex = data.indexOf('.');
	const resultValue = dotIndex !== -1 ? data.substring(0, dotIndex) : data;
	const spacedMoneyValue = resultValue.slice(1).trim().split('').reverse();
	return spacedMoneyValue;
};
