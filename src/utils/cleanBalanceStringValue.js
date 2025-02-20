export const cleanValue = (dataset) => {
	const dotIndex = dataset.indexOf('.');
	const resultValue = dotIndex !== -1 ? dataset.substring(0, dotIndex) : dataset;

	const spacedMoneyValue = resultValue.slice(1).trim().split('').reverse();
	const indexOfItems = () => {
		let newArray = [...spacedMoneyValue];

		for (let i = 3; i < newArray.length; i += 4) {
			newArray.splice(i, 0, ' ');
		}
		return newArray.reverse().join('');
	};

	return indexOfItems();
};
// spacedMoneyValue.length <= 3 ? spacedMoneyValue :
