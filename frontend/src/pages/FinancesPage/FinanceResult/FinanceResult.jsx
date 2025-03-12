import React from 'react';
import { calculateValueInCurrency } from '../../../utils/calculateValueInCurrency';
import { FinanceResultDiagram } from '../Charts/FinanceResultDiagram';
import { ExpensesResult } from './ExpensesResult';
import { IncomeResult } from './IncomeResult';
import { BigResultBalance } from './BigResultBalance';
import { useSelector } from 'react-redux';
import { selectAccounts, selectHistory, selectHistoryIsLoading } from '../../../store/selectors';
import { useCurrency, useFinanceExpensesFromHistory } from '../../../hooks';
import { Loader } from '../../../components/Loaders/Loader';

export const FinanceResult = ({ selectedSortType }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const financeHistory = useSelector(selectHistory);
	const historyIsLoading = useSelector(selectHistoryIsLoading);
	const financeAccounts = useSelector(selectAccounts);
	const expenses = useFinanceExpensesFromHistory({ selectedSortType, showInCategories: true });

	const accountsDB = financeAccounts.reduce((acc, account) => acc + account.balance, 0);
	const historyDB = financeHistory
		.filter((item) => {
			return item.type === 'add';
		})
		.reduce((acc, item) => acc + Number(item.amount), 0);

	const categoriesDB = expenses.mappedData.reduce((acc, item) => acc + item.balance, 0);
	const expensesForDate = calculateValueInCurrency(categoriesDB, isUSD, rubleCourse);
	const incomeForDate = calculateValueInCurrency(historyDB, isUSD, rubleCourse);
	const totalBalanceForDate = calculateValueInCurrency(accountsDB, isUSD, rubleCourse);

	return (
		<div id="finance-result__main-container" className="flex h-full gap-4 transition-all">
			<div className="flex flex-col flex-3 h-full">
				<section className="flex flex-2 justify-center">
					{historyIsLoading ? (
						<Loader />
					) : (
						<BigResultBalance
							isUSD={isUSD}
							totalBalanceForDate={totalBalanceForDate}
							historyIsLoading={historyIsLoading}
						/>
					)}
				</section>
				<section className="flex flex-2 h-full justify-center md:justify-evently 2xl:justify-around gap-12">
					{historyIsLoading ? (
						<Loader />
					) : (
						<IncomeResult
							isUSD={isUSD}
							incomeForDate={incomeForDate}
							historyIsLoading={historyIsLoading}
						/>
					)}
					{historyIsLoading ? (
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
			<section className="md:flex hidden flex-2 p-2 h-full items-center justify-center">
				<FinanceResultDiagram selectedSortType={selectedSortType} />
			</section>
		</div>
	);
};
