import { useCurrency } from './useCurrency';
import { useGetAccountsQuery } from '../store/api/backendApi';
import { calculateValueInCurrency } from '../utils';

export const useFetchAccountsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const { data: accounts = [], isLoading } = useGetAccountsQuery();

	const accountsInCurrency = accounts.map((account) => ({
		...account,
		balance: calculateValueInCurrency(account.balance, isUSD, rubleCourse),
	}));
	return { accountsInCurrency, isLoading };
};
