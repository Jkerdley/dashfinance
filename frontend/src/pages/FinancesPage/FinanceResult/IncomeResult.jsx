import React from 'react';
import { cleanValue } from '../../../utils';

export const IncomeResult = ({ incomeForDate, isUSD }) => {
	return (
		<div className="flex flex-col items-center justify-center text-xl font-medium h-full">
			<span className="text-sm xl:text-xl">Доходы:</span>
			<div className="flex items-center gap-2">
				<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all mt-2 font-medium text-main-green">
					{isUSD ? '$' : '\u20bd'}
				</span>
				<span className="text-2xl md:text-3xl 2xl:text-5xl font-bold transition-all duration-150 ease-in-out truncate text-[#b9ff80]">
					{cleanValue(incomeForDate)}
				</span>
			</div>
		</div>
	);
};
