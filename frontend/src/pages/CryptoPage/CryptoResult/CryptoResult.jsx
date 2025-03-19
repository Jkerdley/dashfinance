import React, { memo, useEffect, useMemo } from 'react';
import { useCurrency } from '../../../hooks';
import { CryptoAssetsAllocationChart } from '../Charts';
import { BestAndWorstPerformer } from './components/BestAndWorstPerformer';
import { CryptoTotalBalance } from './components/CryptoTotalBalance';
import { PNLpercentages } from './components/PNLpercentages';
import { useDispatch } from 'react-redux';
import { getCourseAction } from '../../../store/actions/async';

export const CryptoResult = memo(({ cryptoAssetsInCurrency }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const totalPNL = cryptoAssetsInCurrency.sort((a, b) => a.profitPercentage - b.profitPercentage);
	const indexOfLastItem = totalPNL.length - 1;

	useEffect(() => {
		if (!rubleCourse) {
			dispatch(getCourseAction());
		}
	}, []);

	const cryptoAssetsBalance = useMemo(() => {
		return cryptoAssetsInCurrency.reduce(
			(acc, asset) => acc + parseFloat(asset.profit.slice(1).trim()),
			0,
		);
	}, [cryptoAssetsInCurrency]);

	const totalBalanceForDate = isUSD ? '$ ' + cryptoAssetsBalance : '\u20bd ' + cryptoAssetsBalance;
	return (
		<section id="finance-result__main-container" className="flex w-full h-full">
			<div className="flex flex-3 flex-col flex-wrap sm:gap-2 gap-2 items-center justify-around">
				<CryptoTotalBalance totalBalanceForDate={totalBalanceForDate} isUSD={isUSD} />
				<PNLpercentages totalPNL={totalPNL} indexOfLastItem={indexOfLastItem} />
				<BestAndWorstPerformer totalPNL={totalPNL} indexOfLastItem={indexOfLastItem} />
			</div>

			<div className="lg:flex hidden items-center justify-center flex-2">
				<CryptoAssetsAllocationChart cryptoAssetsInCurrency={cryptoAssetsInCurrency} />
			</div>
		</section>
	);
});
CryptoResult.displayName = 'CryptoResult';
