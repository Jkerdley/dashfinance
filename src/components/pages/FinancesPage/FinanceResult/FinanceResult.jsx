import React from 'react';
import { accounts, categories, operations } from '../../../../db';
import { calculateValueInCurrency } from '../../../../utils/calculateValueInCurrency';

export const FinanceResult = ({ isUSD, rubleCourse }) => {
	const accountsDB = accounts.reduce((acc, account) => acc + account.balance, 0);
	const operationsDB = operations
		.filter((item) => {
			return item.type === 'add';
		})
		.reduce((acc, item) => acc + Number(item.amount), 0);

	const categoriesDB = categories.reduce((acc, item) => acc + item.balance, 0);

	const outcomeForDate = calculateValueInCurrency(categoriesDB, isUSD, rubleCourse);
	const incomeForDate = calculateValueInCurrency(operationsDB, isUSD, rubleCourse);
	const totalBalanceForDate = calculateValueInCurrency(accountsDB, isUSD, rubleCourse);

	return (
		<div className="bg-amber-400/10 h-full">
			<h1>Расходы за месяц: {outcomeForDate}</h1>
			<h1>Доходы за месяц: {incomeForDate}</h1>
			<h1>Баланс: {totalBalanceForDate}</h1>
		</div>
	);
};
