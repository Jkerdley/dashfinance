export type DateFilterType = 'month' | 'thisYear' | 'allTime' | string;

interface OperationWithDate {
	date: string | Date;
	[key: string]: any;
}

export const filteredByThisMonth = <T extends OperationWithDate>(
	array: T[],
	selectedSortType: DateFilterType,
): T[] => {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;

	const arraySortedByMonth = [...array];

	if (selectedSortType === 'month') {
		return arraySortedByMonth.filter((operation) => {
			const operationDate = new Date(operation.date);
			return (
				operationDate.getFullYear() === currentYear && operationDate.getMonth() + 1 === currentMonth
			);
		});
	}

	if (selectedSortType === 'thisYear') {
		return arraySortedByMonth.filter((operation) => {
			const operationDate = new Date(operation.date);
			return operationDate.getFullYear() === currentYear;
		});
	}

	if (selectedSortType === 'allTime') {
		return arraySortedByMonth;
	}

	return arraySortedByMonth;
};
