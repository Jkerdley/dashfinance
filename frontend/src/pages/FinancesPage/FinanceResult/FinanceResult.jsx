import React from 'react';
import { calculateValueInCurrency } from '../../../utils/calculateValueInCurrency';
import { FinanceResultDiagram } from '../Charts/FinanceResultDiagram';
import { ExpensesResult } from './ExpensesResult';
import { IncomeResult } from './IncomeResult';
import { BigResultBalance } from './BigResultBalance';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories, selectHistory } from '../../../store/selectors';
import { useCurrency } from '../../../hooks';

export const FinanceResult = ({ selectedSortType }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const financeHistory = useSelector(selectHistory);
	const financeAccounts = useSelector(selectAccounts);
	const financeCategories = useSelector(selectCategories);
	const accountsDB = financeAccounts.reduce((acc, account) => acc + account.balance, 0);
	const historyDB = financeHistory
		.filter((item) => {
			return item.type === 'add';
		})
		.reduce((acc, item) => acc + Number(item.amount), 0);

	const categoriesDB = financeCategories.reduce((acc, item) => acc + item.balance, 0);

	const expensesForDate = calculateValueInCurrency(categoriesDB, isUSD, rubleCourse);
	const incomeForDate = calculateValueInCurrency(historyDB, isUSD, rubleCourse);
	const totalBalanceForDate = calculateValueInCurrency(accountsDB, isUSD, rubleCourse);

	return (
		<div id="finance-result__main-container" className="flex h-full transition-all">
			<div className="flex flex-col flex-3 2xl:flex-4 h-full">
				<section className="flex flex-2 justify-center">
					<BigResultBalance isUSD={isUSD} totalBalanceForDate={totalBalanceForDate} />
				</section>
				<section className="flex flex-2 h-full justify-center md:justify-evently 2xl:justify-around gap-12">
					<IncomeResult isUSD={isUSD} incomeForDate={incomeForDate} />
					<ExpensesResult isUSD={isUSD} expensesForDate={expensesForDate} />
				</section>
			</div>
			<section className="flex flex-3 h-full items-center justify-center">
				<FinanceResultDiagram selectedSortType={selectedSortType} />
			</section>
		</div>
	);
};
