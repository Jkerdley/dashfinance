import { useMemo } from 'react';
import { useCurrency } from './useCurrency';
import { useGetHistoryQuery } from '../store/api/backendApi';
import { aggregateExpensesByCategory, filteredByThisMonth, getsortedHistory } from '../utils';
import { OPERATION_TYPES, SORT_TYPES } from '../constants/operations';
import type { SortTypesValue } from '../constants/operations';

interface ExpensesHookProps {
	selectedSortType?: SortTypesValue;
	showInCategories: boolean;
}

export interface AggregatedExpense {
	name: string;
	value: number;
	categoryId: string;
	icon?: string;
}

export interface CategoryMappedExpense {
	name: string;
	balance: number;
	id: string;
}

interface UseExpensesReturn {
	mappedData: any[];
	historyIsLoading: boolean;
}

export const useFinanceExpensesFromHistory = ({
	selectedSortType = SORT_TYPES.MONTH,
	showInCategories,
}: ExpensesHookProps): UseExpensesReturn => {
	const { isUSD, rubleCourse } = useCurrency();
	const { data: financeHistory = [], isLoading: historyIsLoading } = useGetHistoryQuery();

	const mappedData = useMemo(() => {
		if (!financeHistory.length) return [];

		const filteredHistoryForChart = financeHistory.filter(
			(operation) => operation.type === OPERATION_TYPES.EXPENSE,
		);
		const sortedHistory = getsortedHistory(
			filteredByThisMonth(filteredHistoryForChart, selectedSortType),
			SORT_TYPES.OLDEST,
		);

		const expensesByCategory: AggregatedExpense[] = aggregateExpensesByCategory(sortedHistory);

		if (showInCategories) {
			return expensesByCategory.map((item) => ({
				name: item.name,
				balance: item.value,
				id: item.categoryId,
			}));
		}

		const currentCourse = rubleCourse || 1;
		return expensesByCategory.map((item) => ({
			...item,
			value: isUSD
				? parseFloat((item.value / currentCourse).toFixed(2))
				: parseFloat(item.value.toFixed(2)),
		}));
	}, [financeHistory, selectedSortType, showInCategories, isUSD, rubleCourse]);

	return { mappedData, historyIsLoading };
};
