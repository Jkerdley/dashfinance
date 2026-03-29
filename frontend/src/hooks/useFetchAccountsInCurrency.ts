import { useMemo } from 'react';
import { useCurrency } from './useCurrency';
import { useGetAccountsQuery } from '../store/api/backendApi';
import { calculateValueInCurrency } from '../utils/calculateValueInCurrency';
import type { Account } from '../types/models';

export interface FormattedAccount extends Omit<Account, 'balance'> {
	balance: string;
}

interface UseFetchAccountsReturn {
	accountsInCurrency: FormattedAccount[];
	isLoading: boolean;
}

export const useFetchAccountsInCurrency = (): UseFetchAccountsReturn => {
	const { isUSD, rubleCourse } = useCurrency();
	const { data: accounts = [], isLoading } = useGetAccountsQuery();

	const accountsInCurrency = useMemo(() => {
		return accounts.map((account) => ({
			...account,
			balance: calculateValueInCurrency(account.balance, isUSD, rubleCourse || 1),
		}));
	}, [accounts, isUSD, rubleCourse]);

	return { accountsInCurrency, isLoading };
};
