import React from 'react';
import { accounts, categories, history } from '../../../../db';
import { calculateValueInCurrency } from '../../../../utils/calculateValueInCurrency';
import { cleanValue } from '../../../../utils/cleanBalanceStringValue';
import { FinanceResultDiagram } from '../Charts/FinanceResultDiagram';

export const FinanceResult = ({ isUSD, rubleCourse }) => {
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
		<div id="finance-result__main-container" className="flex">
			<div className="flex flex-col flex-3 2xl:flex-4 h-full">
				<section className="flex flex-4 justify-center">
					<div className="flex flex-5 flex-col items-center justify-center">
						<span className="xl:text-3xl sm:text-xl text-xl font-medium transition-all">
							Баланс:
						</span>
						<div className="flex items-center gap-2">
							<span
								className={`text-2xl sm:text-2xl md:text-4xl 2xl:text-6xl mt-1 font-medium transition-all duration-150 ease-in-out ${
									parseInt(totalBalanceForDate.slice(1).trim(), 10) > 0
										? 'text-lime-300'
										: 'text-rose-300'
								}`}
							>
								{isUSD ? '$ ' : '\u20bd'}
							</span>
							<span
								className={`text-4xl md:text-5xl xl:text-7xl 2xl:text-8xl transition-all font-bold  transition-all duration-150 ease-in-out ${
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
				<section className="flex flex-2 justify-center md:justify-evently 2xl:justify-around gap-12">
					<div className="flex flex-col items-center justify-center text-xl font-medium h-full">
						<span className="text-sm xl:text-xl">Доходы:</span>
						<div className="flex items-center gap-2">
							<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all font-medium text-lime-300">
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
							<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all font-medium text-rose-300">
								{isUSD ? '$' : '\u20bd'}
							</span>
							<span className="text-3xl md:text-3xl 2xl:text-6xl  transition-all duration-150 ease-in-out font-bold text-rose-300">
								{cleanValue(outcomeForDate)}
							</span>
						</div>
					</div>
				</section>
			</div>
			<div className="flex items-center justify-center flex-2">
				<FinanceResultDiagram />
			</div>
		</div>
	);
};
