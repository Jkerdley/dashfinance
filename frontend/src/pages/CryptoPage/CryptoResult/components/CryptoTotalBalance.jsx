import React from 'react';
import { cleanValue } from '../../../../utils';

export const CryptoTotalBalance = ({ totalBalanceForDate, isUSD }) => {
	return (
		<>
			<span className="xl:text-3xl sm:text-2xl text-xl font-medium transition-all">Баланс:</span>
			<div className="flex items-center gap-2">
				<span
					className={`text-xl sm:text-xl md:text-3xl 2xl:text-5xl mt-1 font-medium transition-all duration-150 ease-in-out ${
						parseInt(totalBalanceForDate.slice(1).trim(), 10) > 0
							? 'text-main-green'
							: 'text-main-red'
					}`}
				>
					{isUSD ? '$ ' : '\u20bd'}
				</span>
				<span
					className={`text-5xl md:text-5xl lg:text-7xl  2xl:text-8xl font-bold transition-all duration-150 ease-in-out ${
						parseInt(totalBalanceForDate.slice(1).trim(), 10) > 0
							? 'text-main-green'
							: 'text-main-red'
					}`}
				>
					{cleanValue(totalBalanceForDate)}
				</span>
			</div>
		</>
	);
};
