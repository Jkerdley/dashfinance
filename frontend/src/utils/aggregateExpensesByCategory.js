export const aggregateExpensesByCategory = (operations) => {
	const result = {};

	operations.forEach((operation) => {
		if (operation.type === 'spend') {
			const category = operation.category;
			if (!result[category]) {
				result[category] = 0;
			}
			result[category] += operation.amount;
		}
	});

	return Object.entries(result).map(([category, amount]) => ({
		name: category,
		value: amount,
	}));
};
