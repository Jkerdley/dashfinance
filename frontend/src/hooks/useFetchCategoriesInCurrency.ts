import { useMemo } from 'react';
import { useCurrency } from './useCurrency';
import { useGetCategoriesQuery } from '../store/api/backendApi';
import { calculateValueInCurrency } from '../utils/calculateValueInCurrency';
import { useFinanceExpensesFromHistory } from './useFinanceExpensesFromHistory';
import type { Category } from '../types/models';
import type { SortTypesValue } from '../constants/operations';
import type { CategoryMappedExpense } from './useFinanceExpensesFromHistory';

export interface FormattedCategory extends Omit<Category, 'balance' | 'budget'> {
	balance: string;
	budget: string;
}

interface UseFetchCategoriesReturn {
	categoriesInCurrency: FormattedCategory[];
	categoriesIsLoading: boolean;
}

export const useFetchCategoriesInCurrency = (selectedSortType: SortTypesValue): UseFetchCategoriesReturn => {
	const { mappedData } = useFinanceExpensesFromHistory({
		selectedSortType,
		showInCategories: true,
	}) as { mappedData: CategoryMappedExpense[] };

	const { isUSD, rubleCourse } = useCurrency();
	const { data: categories = [], isLoading: categoriesIsLoading } = useGetCategoriesQuery();

	const categoriesInCurrency = useMemo(() => {
		const expensesMap = mappedData.reduce<Record<string, number>>((acc, item) => {
			acc[item.id] = item.balance;
			return acc;
		}, {});

		const currentCourse = rubleCourse || 1;

		return categories.map((categorie) => {
			const newBalanceInCategorie = expensesMap[categorie.id] || 0;
			const currentBudget = categorie.budget || 0;

			return {
				...categorie,
				balance: calculateValueInCurrency(newBalanceInCategorie, isUSD, currentCourse),
				budget: calculateValueInCurrency(currentBudget, isUSD, currentCourse),
			};
		});
	}, [categories, mappedData, isUSD, rubleCourse]);

	return { categoriesInCurrency, categoriesIsLoading };
};
