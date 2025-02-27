import { trimAndReverseMoneyValue } from './trimAndReverseMoneyValue';

export const cleanValue = (dataset) => {
	const spacedMoneyValue = trimAndReverseMoneyValue(dataset);
	const addSpacesToNumber = () => {
		let newArray = [...spacedMoneyValue];

		for (let i = 3; i < newArray.length; i += 4) {
			newArray.splice(i, 0, ' ');
		}
		return newArray.reverse().join('');
	};

	return addSpacesToNumber();
};
// spacedMoneyValue.length <= 3 ? spacedMoneyValue :
