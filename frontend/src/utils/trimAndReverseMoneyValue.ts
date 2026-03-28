export const trimAndReverseMoneyValue = (data: string | number): string[] => {
	const stringData = String(data);
	const dotIndex = stringData?.indexOf('.');
	const resultValue = dotIndex !== -1 ? stringData.substring(0, dotIndex) : stringData;

	const spacedMoneyValue = resultValue?.slice(1).trim().split('').reverse();
	return spacedMoneyValue;
};
