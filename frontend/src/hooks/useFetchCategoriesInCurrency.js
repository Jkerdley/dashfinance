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

	const categoriesInCurrency = categories.map((categorie) => {
		const findedCategoryInExpensesHistory = mappedData.filter((item) => item.id === categorie.id);
		const newBalanceInCategorie =
			findedCategoryInExpensesHistory.length > 0 ? findedCategoryInExpensesHistory[0].balance : 0;

		return {
			...categorie,
			balance: calculateValueInCurrency(newBalanceInCategorie, isUSD, rubleCourse),
			budget: calculateValueInCurrency(categorie.budget, isUSD, rubleCourse),
		};
	});

	return { categoriesInCurrency, categoriesIsLoading };
};
