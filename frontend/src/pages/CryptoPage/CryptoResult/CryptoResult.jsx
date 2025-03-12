import React from 'react';
import { cleanValue } from '../../../utils';
import { useCurrency, useFetchCryptoAssetsInCurrency } from '../../../hooks';
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
		<section id="finance-result__main-container" className="flex justify-center w-full h-full">
			<div className="flex flex-col flex-3 2xl:flex-4">
				<div className="flex flex-4 justify-center">
					<div className="flex flex-5 flex-col items-center">
						{isLoading ? (
							<Loader />
						) : (
							<>
								<PNLpercentages totalPNL={totalPNL} indexOfLastItem={indexOfLastItem} />
								<CryptoTotalBalance totalBalanceForDate={totalBalanceForDate} isUSD={isUSD} />
								<BestAndWorstPerformer
									totalPNL={totalPNL}
									indexOfLastItem={indexOfLastItem}
								/>
							</>
						)}
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center flex-2">
				<CryptoAssetsAllocationChart
					cryptoAssetsInCurrency={cryptoAssetsInCurrency}
					isLoading={isLoading}
				/>
			</div>
		</section>
	);
};
