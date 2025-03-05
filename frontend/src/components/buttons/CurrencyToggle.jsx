import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currencySelector } from '../../store/selectors/currency-selector';
import { ACTIONS } from '../../store/actionTypes';

export const CurrencyToggle = () => {
	const isUSD = useSelector(currencySelector);
	const dispatch = useDispatch();

	const toggleCurrency = () => {
		dispatch({ type: ACTIONS.CYRRENCY_SWITCH });
	};

	return (
		<div className="flex items-center space-x-3">
			<span className={`transition-colors ${isUSD ? 'text-sky-300' : 'text-gray-300/80'}`}>USD</span>
			<div
				onClick={toggleCurrency}
				className={`relative w-14 h-8 bg-linear-to-r ${isUSD ? 'from-sky-300/85 to-sky-50/45' : 'from-sky-50/45 to-sky-400/95'} rounded-full cursor-pointer transition-colors duration-200`}
			>
				<div
					className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
						isUSD ? 'translate-x-0' : 'translate-x-6'
					}`}
				></div>
			</div>
			<span className={`transition-colors ${!isUSD ? 'text-sky-300' : 'text-gray-300/80'}`}>RUB</span>
		</div>
	);
};
