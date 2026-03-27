import { useMemo } from 'react';
import { useCurrency } from './useCurrency';
import { useGetAccountsQuery } from '../store/api/backendApi';
import { calculateValueInCurrency } from '../utils';

export const useFetchAccountsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const { data: accounts = [], isLoading } = useGetAccountsQuery();

	const accountsInCurrency = useMemo(() => {
		return accounts.map((account) => ({
			...account,
			balance: calculateValueInCurrency(account.balance, isUSD, rubleCourse),
		}));
	}, [accounts, isUSD, rubleCourse]);

	return { accountsInCurrency, isLoading };
};
