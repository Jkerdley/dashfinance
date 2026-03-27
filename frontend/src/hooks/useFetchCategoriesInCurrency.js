import { useMemo } from 'react';
import { useCurrency } from './useCurrency';
import { useGetCategoriesQuery } from '../store/api/backendApi';
import { calculateValueInCurrency } from '../utils';
import { useFinanceExpensesFromHistory } from './useFinanceExpensesFromHistory';

export const useFetchCategoriesInCurrency = (selectedSortType) => {
	const { mappedData } = useFinanceExpensesFromHistory({
		selectedSortType,
		showInCategories: true,
	});
	const { isUSD, rubleCourse } = useCurrency();
	const { data: categories = [], isLoading: categoriesIsLoading } = useGetCategoriesQuery();

	const categoriesInCurrency = useMemo(() => {
		const expensesMap = mappedData.reduce((acc, item) => {
			acc[item.id] = item.balance;
			return acc;
		}, {});

		return categories.map((categorie) => {
			const newBalanceInCategorie = expensesMap[categorie.id] || 0;

			return {
				...categorie,
				balance: calculateValueInCurrency(newBalanceInCategorie, isUSD, rubleCourse),
				budget: calculateValueInCurrency(categorie.budget, isUSD, rubleCourse),
			};
		});
	}, [categories, mappedData, isUSD, rubleCourse]);

	return { categoriesInCurrency, categoriesIsLoading };
};
