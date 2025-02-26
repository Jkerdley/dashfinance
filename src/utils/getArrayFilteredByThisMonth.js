export const filteredByThisMonth = (array, selectedSortType) => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	let arraySortedByMonth = [...array];
	if (selectedSortType === 'days') {
		const result = arraySortedByMonth.filter((operation) => {
			const operationDate = new Date(operation.date);
			return operationDate.getFullYear() === currentYear && operationDate.getMonth() === currentMonth;
		});
		return result;
	} else if (selectedSortType === 'thisYear') {
		const yearResult = arraySortedByMonth.filter((operation) => {
			const operationDate = new Date(operation.date);
			return operationDate.getFullYear() === currentYear;
		});
		return yearResult;
	} else if (selectedSortType === 'allTime') {
		return arraySortedByMonth;
	}
};
