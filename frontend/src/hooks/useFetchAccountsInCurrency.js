import { useDispatch, useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';
import { useEffect } from 'react';
import { fetchAccounts } from '../store/actions/async/fetchAccounts';
import { selectAccounts, selectAccountsIsLoading } from '../store/selectors';
import { calculateValueInCurrency } from '../utils';

export const useFetchAccountsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const isLoading = useSelector(selectAccountsIsLoading);
	const accounts = useSelector(selectAccounts);

	useEffect(() => {
		accounts.length === 0 && dispatch(fetchAccounts());
	}, []);

	const accountsInCurrency = accounts.map((account) => ({
		...account,
		balance: calculateValueInCurrency(account.balance, isUSD, rubleCourse),
	}));
	return { accountsInCurrency, isLoading };
};
