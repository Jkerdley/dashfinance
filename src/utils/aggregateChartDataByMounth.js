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
	// console.log('result', result);

	return Object.values(result);
};

// export const aggregateChartDataByMonth = (operations) => {
// 	const result = [];

// 	// Сначала агрегируем данные по дням
// 	operations.forEach((operation) => {
// 		const date = new Date(operation.date).toISOString().slice(0, 10);

// 		if (!result[date]) {
// 			result[date] = { date: date, Доходы: 0, Расходы: 0 };
// 		}

// 		if (operation.type === 'add') {
// 			result[date].Доходы += operation.amount;
// 		} else if (operation.type === 'spend') {
// 			result[date].Расходы += operation.amount;
// 		}
// 	});

// 	// Теперь создаем итоговый массив с накоплением
// 	const accumulatedResult = [];
// 	let totalIncome = 0;
// 	let totalExpenses = 0;

// 	for (let date in result) {
// 		totalIncome += result[date].Доходы;
// 		totalExpenses += result[date].Расходы;

// 		accumulatedResult.push({
// 			date: date,
// 			Доходы: totalIncome,
// 			Расходы: totalExpenses,
// 			Баланс: totalIncome - totalExpenses,
// 		});
// 	}

// 	return accumulatedResult;
// };

// export const aggregateChartDataByMonth = (operations) => {
// 	const result = {};

// 	operations.forEach((operation) => {
// 		const month = new Date(operation.date).toISOString().slice(0, 9);
// 		if (!result[month]) {
// 			result[month] = { income: 0, expenses: 0, balance: 0 };
// 		}

// 		if (operation.type === 'add') {
// 			result[month].income += operation.amount;
// 		} else if (operation.type === 'spend') {
// 			result[month].expenses += operation.amount;
// 		}
// 	});

// 	// Вычисляем баланс
// 	for (const month in result) {
// 		result[month].balance = result[month].income - result[month].expenses;
// 	}

// 	return result;
// };
