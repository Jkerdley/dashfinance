export const filteredByThisMonth = (array, selectedSortType) => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;

	let arraySortedByMonth = [...array];
	if (selectedSortType === 'month') {
		const result = arraySortedByMonth.filter((operation) => {
			const operationDate = new Date(operation.date);
			return (
				operationDate.getFullYear() === currentYear && operationDate.getMonth() + 1 === currentMonth
			);
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
