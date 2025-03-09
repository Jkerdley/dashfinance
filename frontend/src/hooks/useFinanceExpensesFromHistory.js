import { useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';
import { selectHistory, selectHistoryIsLoading } from '../store/selectors';
import { aggregateExpensesByCategory, filteredByThisMonth, getsortedHistory } from '../utils';

export const useFinanceExpensesFromHistory = ({ selectedSortType = 'month', showInCategories }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const financeHistory = useSelector(selectHistory);
	const historyIsLoading = useSelector(selectHistoryIsLoading);
	const filteredHistoryForChart = financeHistory.filter((operation) => operation.type === 'spend');

	const sortedHistory = getsortedHistory(
		filteredByThisMonth(filteredHistoryForChart, selectedSortType),
		'oldest',
	);

	const expensesByCategory = aggregateExpensesByCategory(sortedHistory);

	if (showInCategories) {
		const mappedData = expensesByCategory.map((item) => {
			return {
				name: item.name,
				balance: item.value,
				id: item.categoryId,
			};
		});
		return { mappedData, historyIsLoading };
	} else {
		const mappedData = expensesByCategory.map((item) => {
			return {
				...item,
				value: isUSD
					? parseFloat((item.value / rubleCourse).toFixed(2))
					: parseFloat(item.value.toFixed(2)),
			};
		});
		return { mappedData, historyIsLoading };
	}
};
