import React from 'react';
import { cleanValue } from '../../../utils';

export const ExpensesResult = ({ isUSD, expensesForDate }) => {
	console.log('expensesForDate', expensesForDate);

	return (
		<div className="flex flex-col items-center justify-center text-xl font-medium h-full">
			<span className="text-sm xl:text-xl">Расходы: </span>
			<div className="flex items-center gap-2">
				<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all mt-2  font-medium text-main-red">
					{isUSD ? '$' : '\u20bd'}
				</span>
				<span className="text-3xl md:text-3xl 2xl:text-5xl  transition-all duration-150 ease-in-out font-bold truncate text-main-red">
					{cleanValue(expensesForDate)}
				</span>
			</div>
		</div>
	);
};
