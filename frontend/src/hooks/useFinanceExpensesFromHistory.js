import { useMemo } from 'react';
import { useCurrency } from './useCurrency';
import { useGetHistoryQuery } from '../store/api/backendApi';
import { aggregateExpensesByCategory, filteredByThisMonth, getsortedHistory } from '../utils';

export const useFinanceExpensesFromHistory = ({ selectedSortType = 'month', showInCategories }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const { data: financeHistory = [], isLoading: historyIsLoading } = useGetHistoryQuery();

	const mappedData = useMemo(() => {
		if (!financeHistory.length) return [];

		const filteredHistoryForChart = financeHistory.filter((operation) => operation.type === 'spend');
		const sortedHistory = getsortedHistory(
			filteredByThisMonth(filteredHistoryForChart, selectedSortType),
			'oldest',
		);

		const expensesByCategory = aggregateExpensesByCategory(sortedHistory);

		if (showInCategories) {
			return expensesByCategory.map((item) => ({
				name: item.name,
				balance: item.value,
				id: item.categoryId,
			}));
		}

		return expensesByCategory.map((item) => ({
			...item,
			value: isUSD
				? parseFloat((item.value / rubleCourse).toFixed(2))
				: parseFloat(item.value.toFixed(2)),
		}));
	}, [financeHistory, selectedSortType, showInCategories, isUSD, rubleCourse]);

	return { mappedData, historyIsLoading };
};
