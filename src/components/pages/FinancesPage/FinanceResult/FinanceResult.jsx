import React, { useState } from 'react';
import { accounts, categories, history } from '../../../../db';
import { calculateValueInCurrency } from '../../../../utils/calculateValueInCurrency';
import { cleanValue } from '../../../../utils/cleanBalanceStringValue';
import { FinanceResultDiagram } from '../Charts/FinanceResultDiagram';

export const FinanceResult = ({ isUSD, rubleCourse, selectedSortType }) => {
	const accountsDB = accounts.reduce((acc, account) => acc + account.balance, 0);
	const historyDB = history
		.filter((item) => {
			return item.type === 'add';
		})
		.reduce((acc, item) => acc + Number(item.amount), 0);

	const categoriesDB = categories.reduce((acc, item) => acc + item.balance, 0);

	const outcomeForDate = calculateValueInCurrency(categoriesDB, isUSD, rubleCourse);
	const incomeForDate = calculateValueInCurrency(historyDB, isUSD, rubleCourse);
	const totalBalanceForDate = calculateValueInCurrency(accountsDB, isUSD, rubleCourse);

	return (
		<div id="finance-result__main-container" className="flex h-full">
			<div className="flex flex-col flex-3 2xl:flex-4 h-full">
				<section className="flex flex-4justify-center">
					<div className="flex flex-5 flex-col items-center justify-center mt-2">
						<span className="xl:text-2xl sm:text-xl text-xl font-medium transition-all">
							Баланс:
						</span>
						<div className="flex items-center gap-2">
							<span
								className={`text-2xl sm:text-xl md:text-3xl 2xl:text-5xl mt-4 font-medium transition-all duration-150 ease-in-out ${
									parseInt(totalBalanceForDate.slice(1).trim(), 10) > 0
										? 'text-lime-300'
										: 'text-rose-300'
								}`}
							>
								{isUSD ? '$ ' : '\u20bd'}
							</span>
							<span
								className={`text-4xl md:text-5xl xl:text-7xl 2xl:text-8xl font-bold mt-2  transition-all duration-150 ease-in-out ${
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
				<section className="flex flex-2 h-full justify-center md:justify-evently 2xl:justify-around gap-12">
					<div className="flex flex-col items-center justify-center text-xl font-medium h-full">
						<span className="text-sm xl:text-xl">Доходы:</span>
						<div className="flex items-center gap-2">
							<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all mt-2 font-medium text-lime-300">
								{isUSD ? '$' : '\u20bd'}
							</span>
							<span className="text-3xl md:text-3xl 2xl:text-6xl font-bold transition-all duration-150 ease-in-out text-lime-300">
								{cleanValue(incomeForDate)}
							</span>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center text-xl font-medium h-full">
						<span className="text-sm xl:text-xl">Расходы: </span>
						<div className="flex items-center gap-2">
							<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all mt-2  font-medium text-rose-300">
								{isUSD ? '$' : '\u20bd'}
							</span>
							<span className="text-3xl md:text-3xl 2xl:text-6xl  transition-all duration-150 ease-in-out font-bold text-rose-300">
								{cleanValue(outcomeForDate)}
							</span>
						</div>
					</div>
				</section>
			</div>
			<div className="flex flex-3 h-full items-center justify-center">
				<FinanceResultDiagram selectedSortType={selectedSortType} />
			</div>
		</div>
	);
};
