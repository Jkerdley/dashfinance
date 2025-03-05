import { useDispatch, useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';
import { useEffect } from 'react';
import { selectCategories, selectCategoriesIsLoading } from '../store/selectors';
import { calculateValueInCurrency } from '../utils';
import { fetchCategories } from '../store/actions/async/fetchCategories';
import { useFinanceExpensesFromHistory } from './useFinanceExpensesFromHistory';

export const useFetchCategoriesInCurrency = (selectedSortType) => {
	const { mappedData, historyIsLoading } = useFinanceExpensesFromHistory({
		selectedSortType,
		showInCategories: true,
	});
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const categoriesIsLoading = useSelector(selectCategoriesIsLoading);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const categories = useSelector(selectCategories);

	const categoriesInCurrency = categories.map((categorie) => {
		const findedCategoryInExpensesHistory = mappedData.filter(
			(item) => item.name.toLowerCase() === categorie.name.toLowerCase(),
		);
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
