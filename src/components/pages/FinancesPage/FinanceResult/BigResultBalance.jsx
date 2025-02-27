import React from 'react';
import { cleanValue } from '../../../../utils';

export const BigResultBalance = ({ isUSD, totalBalanceForDate }) => {
	return (
		<div className="flex flex-5 flex-col items-center justify-center">
			<span className="xl:text-xl sm:text-xl text-xl font-medium transition-all">Баланс:</span>
			<div className="flex items-center gap-2">
				<span
					className={`text-2xl sm:text-xl md:text-3xl 2xl:text-5xl mt-2 font-medium transition-all duration-150 ease-in-out ${
						parseInt(totalBalanceForDate.slice(1).trim(), 10) > 0
							? 'text-main-green'
							: 'text-main-red'
					}`}
				>
					{isUSD ? '$ ' : '\u20bd'}
				</span>
				<span
					className={`text-4xl md:text-5xl xl:text-7xl 2xl:text-8xl font-bold transition-all duration-150 ease-in-out ${
						parseInt(totalBalanceForDate.slice(1).trim(), 10) > 0
							? 'text-main-green'
							: 'text-main-red'
					}`}
				>
					{cleanValue(totalBalanceForDate)}
				</span>
			</div>
		</div>
	);
};
