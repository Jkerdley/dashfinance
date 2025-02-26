export const aggregateChartDataByMonth = (operations, sortType) => {
	const result = [];

	operations.forEach((operation) => {
		const date = new Date(operation.date).toISOString().slice(0, sortType === 'month' ? 7 : 10);

		if (!result[date]) {
			result[date] = { date: date, Доходы: 0, Расходы: 0, Баланс: 0 };
		}

		if (operation.type === 'add') {
			result[date].Доходы += operation.amount;
		} else if (operation.type === 'spend') {
			result[date].Расходы += operation.amount;
		}
	});

	for (let date in result) {
		result[date].Баланс = result[date].Доходы - result[date].Расходы;
	}

	return Object.values(result);
};
