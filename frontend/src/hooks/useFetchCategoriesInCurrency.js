import { useDispatch, useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';
import { useEffect } from 'react';
import { selectAccountsIsLoading, selectCategories } from '../store/selectors';
import { calculateValueInCurrency } from '../utils';
import { fetchCategories } from '../store/actions/async/fetchCategories';

export const useFetchCategoriesInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const categoriesIsLoading = useSelector(selectAccountsIsLoading);

	useEffect(() => {
		dispatch(fetchCategories());
	}, []);
	const categories = useSelector(selectCategories);

	const categoriesInCurrency = categories.map((categorie) => ({
		...categorie,
		balance: calculateValueInCurrency(categorie.balance, isUSD, rubleCourse),
		budget: calculateValueInCurrency(categorie.budget, isUSD, rubleCourse),
	}));
	return { categoriesInCurrency, categoriesIsLoading };
};
