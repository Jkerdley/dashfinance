import React, { memo, useEffect, useMemo } from 'react';
import { calculateValueInCurrency } from '../../../utils/calculateValueInCurrency';
import { FinanceResultDiagram } from '../Charts/FinanceResultDiagram';
import { ExpensesResult } from './ExpensesResult';
import { IncomeResult } from './IncomeResult';
import { BigResultBalance } from './BigResultBalance';
import { useDispatch } from 'react-redux';
import { useGetAccountsQuery, useGetHistoryQuery } from '../../../store/api/backendApi';
import { useGetCurrencyRatesQuery } from '../../../store/api/externalApi';
import { useCurrency, useFinanceExpensesFromHistory } from '../../../hooks';
import { Loader } from '../../../components/Loaders/Loader';
import { setUsdCourse } from '../../../store/slices/currencySlice';

export const FinanceResult = memo(({ selectedSortType }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const { data: financeHistory = [], isLoading: historyIsLoading } = useGetHistoryQuery();
	const { data: financeAccounts = [], isLoading: accountsIsLoading } = useGetAccountsQuery();
	const { data: currencyData } = useGetCurrencyRatesQuery();
	const expenses = useFinanceExpensesFromHistory({ selectedSortType, showInCategories: true });

	useEffect(() => {
		if (currencyData && !rubleCourse) {
			const course = currencyData.cbrf.data[0][3];
			dispatch(setUsdCourse(course));
		}
	}, [currencyData, rubleCourse, dispatch]);

	const totalBalanceForDate = useMemo(() => {
		const accountsDB = financeAccounts.reduce((acc, account) => acc + account.balance, 0);
		return calculateValueInCurrency(accountsDB, isUSD, rubleCourse);
	}, [financeAccounts, isUSD, rubleCourse]);

	const incomeForDate = useMemo(() => {
		const historyDB = financeHistory
			.filter((item) => item.type === 'add')
			.reduce((acc, item) => acc + Number(item.amount), 0);
		return calculateValueInCurrency(historyDB, isUSD, rubleCourse);
	}, [financeHistory, isUSD, rubleCourse]);

	const expensesForDate = useMemo(() => {
		const categoriesDB = expenses.mappedData.reduce((acc, item) => acc + item.balance, 0);
		return calculateValueInCurrency(categoriesDB, isUSD, rubleCourse);
	}, [expenses.mappedData, isUSD, rubleCourse]);

	const isLoading = historyIsLoading || accountsIsLoading;

	return (
		<div id="finance-result__main-container" className="flex h-full gap-4 transition-all">
			<div className="flex flex-col flex-3 h-full">
				<section className="flex flex-2 justify-center">
					{isLoading ? (
						<Loader />
					) : (
						<BigResultBalance
							isUSD={isUSD}
							totalBalanceForDate={totalBalanceForDate}
							historyIsLoading={historyIsLoading}
						/>
					)}
				</section>
				<section className="flex flex-2 h-full justify-center md:justify-evently gap-6 md:gap-18">
					{isLoading ? (
						<Loader />
					) : (
						<IncomeResult
							isUSD={isUSD}
							incomeForDate={incomeForDate}
							historyIsLoading={historyIsLoading}
						/>
					)}
					{isLoading ? (
						<Loader />
					) : (
						<ExpensesResult
							isUSD={isUSD}
							expensesForDate={expensesForDate}
							historyIsLoading={historyIsLoading}
						/>
					)}
				</section>
			</div>
			<section className="lg:flex hidden flex-2 p-2 h-full items-center justify-center">
				<FinanceResultDiagram selectedSortType={selectedSortType} />
			</section>
		</div>
	);
});
FinanceResult.displayName = 'FinanceResult';
