export const aggregateExpensesByCategory = (operations) => {
	const result = {};

	operations.forEach((operation) => {
		if (operation.type === 'spend') {
			const categoryId = operation.categoryId;
			const categoryName = operation.category;

			if (!result[categoryId]) {
				result[categoryId] = {
					name: categoryName,
					amount: 0,
				};
			}

			result[categoryId].amount += operation.amount;
		}
	});

	return Object.entries(result).map(([categoryId, { name, amount }]) => ({
		categoryId: categoryId,
		name: name,
		value: amount,
	}));
};
