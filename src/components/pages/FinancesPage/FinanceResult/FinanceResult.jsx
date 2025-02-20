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
			<div className="flex flex-col flex-2 2xl:flex-4">
				<section className="flex flex-4 justify-center">
					<div className="flex flex-col items-center justify-center">
						<span className="text-3xl font-medium">Баланс:</span>
						<div className="flex items-center gap-2">
							<span
								className={`text-3xl md:text-5xl 2xl:text-6xl mt-1 font-medium ${
									parseInt(totalBalanceForDate.slice(1).trim(), 10) > 0
										? 'text-lime-300'
										: 'text-rose-300'
								}`}
							>
								{isUSD ? '$ ' : '\u20bd'}
							</span>
							<span
								className={`text-6xl  xl:text-7xl 2xl:text-8xl transition-all font-bold ${
									parseInt(totalBalanceForDate.slice(1).trim(), 10) > 0
										? 'text-lime-300'
										: 'text-rose-300'
								}`}
							>
								{cleanValue(totalBalanceForDate)}
							</span>
						</div>
					</div>
				</section>
				<section className="flex flex-2 justify-center md:justify-evently 2xl:justify-around  gap-12 bg-amber-800">
					<div className="flex flex-col items-center justify-center text-xl font-medium h-full">
						<span>Доходы:</span>
						<div className="flex items-center gap-2">
							<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all font-medium text-lime-300">
								{isUSD ? '$' : '\u20bd'}
							</span>
							<span className="text-3xl md:text-5xl 2xl:text-6xl transition-all font-bold text-lime-300">
								{cleanValue(incomeForDate)}
							</span>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center text-xl font-medium h-full">
						<span>Расходы: </span>
						<div className="flex items-center gap-2">
							<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all font-medium text-rose-300">
								{isUSD ? '$' : '\u20bd'}
							</span>
							<span className="text-3xl md:text-5xl 2xl:text-6xl transition-all font-bold text-rose-300">
								{cleanValue(outcomeForDate)}
							</span>
						</div>
					</div>
				</section>
			</div>
			<div className="flex items-center justify-center flex-2">
				<span>ТУТ БУДЕТ ДИАГРАММА</span>
			</div>
		</div>
	);
};
