interface SpendOperation {
	type: string;
	categoryId?: string;
	category?: string;
	amount: number;
	[key: string]: any;
}

interface AggregatedCategoryExpense {
	categoryId: string;
	name: string;
	value: number;
}

export const aggregateExpensesByCategory = (operations: SpendOperation[]): AggregatedCategoryExpense[] => {
	const result: Record<string, { name: string; amount: number }> = {};

	operations.forEach((operation) => {
		if (operation.type === 'spend' && operation.categoryId && operation.category) {
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
