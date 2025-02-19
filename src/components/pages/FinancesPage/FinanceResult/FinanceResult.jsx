import React from 'react';
import { accounts, categories, operations } from '../../../../db';
import { calculateValueInCurrency } from '../../../../utils/calculateValueInCurrency';
import { cleanValue } from '../../../../utils/cleanBalanceStringValue';

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
		<div id="finance-result__main-container" className="flex h-full">
			<div className="flex flex-col flex-3">
				<div className="flex flex-4 w-full items-center justify-start ">
					<div className="flex items-center gap-3">
						<span className="text-2xl font-medium">Баланс:</span>
						<div className="flex items-center gap-1">
							<span className="text-4xl font-medium -mb-2">{isUSD ? '$' : '\u20bd'}</span>
							<span className="text-7xl font-bold">{cleanValue(totalBalanceForDate)}</span>
						</div>
					</div>
				</div>
				<div className="flex flex-2 justify-between">
					<span className="flex items-center justify-center gap-2 text-xl font-medium h-full">
						Расходы:
						<span className="text-2xl font-medium">{isUSD ? '$' : '\u20bd'}</span>
						<span className="text-4xl font-bold">{cleanValue(outcomeForDate)}</span>
					</span>
					<span className="flex items-center justify-center gap-2 text-xl font-medium h-full">
						<span>Доходы: </span>
						<span className="text-2xl font-medium">{isUSD ? '$' : '\u20bd'}</span>
						<span className="text-4xl font-bold">{cleanValue(incomeForDate)}</span>
					</span>
				</div>
			</div>
			<div className="flex items-center justify-center flex-2 bg-blue-400">
				<span>ТУТ БУДЕТ ДИАГРАММА</span>
			</div>
		</div>
	);
};
