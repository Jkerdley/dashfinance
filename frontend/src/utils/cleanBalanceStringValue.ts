import { trimAndReverseMoneyValue } from './trimAndReverseMoneyValue';

export const cleanValue = (dataset: string | number): string => {
	const spacedMoneyValue = trimAndReverseMoneyValue(dataset);

	const addSpacesToNumber = () => {
		const newArray = [...spacedMoneyValue];

		for (let i = 3; i < newArray.length; i += 4) {
			newArray.splice(i, 0, ' ');
		}
		return newArray.reverse().join('');
	};

	return addSpacesToNumber();
};
