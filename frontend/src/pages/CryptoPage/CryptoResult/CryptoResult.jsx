import React from 'react';
import { useCurrency } from '../../../hooks';
import { Loader } from '../../../components/Loaders/Loader';
import { CryptoAssetsAllocationChart } from '../Charts';
import { BestAndWorstPerformer } from './components/BestAndWorstPerformer';
import { CryptoTotalBalance } from './components/CryptoTotalBalance';
import { PNLpercentages } from './components/PNLpercentages';

export const CryptoResult = ({ cryptoAssetsInCurrency, isLoading }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const totalPNL = cryptoAssetsInCurrency.sort((a, b) => a.profitPercentage - b.profitPercentage);
	const indexOfLastItem = totalPNL.length - 1;

	const cryptoAssetsBalance = cryptoAssetsInCurrency.reduce(
		(acc, asset) => acc + parseFloat(asset.profit.slice(1).trim()),
		0,
	);

	const totalBalanceForDate = isUSD ? '$ ' + cryptoAssetsBalance : '\u20bd ' + cryptoAssetsBalance;
	return (
		<section id="finance-result__main-container" className="flex w-full h-full">
			<div className="flex flex-3 flex-col flex-wrap sm:gap-2 gap-2 items-center justify-around">
				{isLoading ? (
					<Loader />
				) : (
					<>
						<CryptoTotalBalance totalBalanceForDate={totalBalanceForDate} isUSD={isUSD} />
						<PNLpercentages totalPNL={totalPNL} indexOfLastItem={indexOfLastItem} />
						<BestAndWorstPerformer totalPNL={totalPNL} indexOfLastItem={indexOfLastItem} />
					</>
				)}
			</div>

			<div className="lg:flex hidden items-center justify-center flex-2">
				<CryptoAssetsAllocationChart
					cryptoAssetsInCurrency={cryptoAssetsInCurrency}
					isLoading={isLoading}
				/>
			</div>
		</section>
	);
};
