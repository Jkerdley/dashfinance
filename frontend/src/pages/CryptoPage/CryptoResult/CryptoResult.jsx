import React from 'react';
import { cleanValue } from '../../../utils';
import { useCurrency, useFetchCryptoAssetsInCurrency } from '../../../hooks';
import { Loader } from '../../../components/Loaders/Loader';
import { CryptoAssetsAllocationChart } from '../Charts';

export const CryptoResult = ({ cryptoAssetsInCurrency, isLoading }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const cryptoAssetsSumm2 = cryptoAssetsInCurrency.reduce(
		(acc, asset) => acc + parseFloat(asset.profit.slice(1).trim()),
		0,
	);

	const totalBalanceForDate = isUSD ? '$ ' + cryptoAssetsSumm2 : '\u20bd ' + cryptoAssetsSumm2;
	return (
		<section id="finance-result__main-container" className="flex justify-center w-full h-full">
			<div className="flex flex-col flex-3 2xl:flex-4">
				<div className="flex flex-4 justify-center">
					<div className="flex flex-5 flex-col items-center justify-center">
						{isLoading ? (
							<Loader />
						) : (
							<>
								<span className="xl:text-3xl sm:text-xl text-xl font-medium transition-all">
									Баланс:
								</span>
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
										className={`text-4xl md:text-4xl xl:text-7xl 2xl:text-8xl font-bold transition-all duration-150 ease-in-out ${
											parseInt(totalBalanceForDate.slice(1).trim(), 10) > 0
												? 'text-main-green'
												: 'text-main-red'
										}`}
									>
										{cleanValue(totalBalanceForDate)}
									</span>
								</div>
							</>
						)}
					</div>
				</div>
				{'//TODO SPEND AND ADD'}
				{/* <section className="flex flex-2 justify-center md:justify-evently 2xl:justify-around gap-12">
					<div className="flex flex-col items-center justify-center text-xl font-medium h-full">
						<span className="text-sm xl:text-xl">Доходы:</span>
						<div className="flex items-center gap-2">
							<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all font-medium text-main-green">
								{isUSD ? '$' : '\u20bd'}
							</span>
							<span className="text-3xl md:text-3xl 2xl:text-6xl font-bold transition-all duration-150 ease-in-out text-main-green>
								{cleanValue(incomeForDate)}
							</span>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center text-xl font-medium h-full">
						<span className="text-sm xl:text-xl">Расходы: </span>
						<div className="flex items-center gap-2">
							<span className="text-2xl md:text-3xl 2xl:text-4xl transition-all font-medium text-main-red">
								{isUSD ? '$' : '\u20bd'}
							</span>
							<span className="text-3xl md:text-3xl 2xl:text-6xl  transition-all duration-150 ease-in-out font-bold text-main-red">
								{cleanValue(expensesForDate)}
							</span>
						</div>
					</div>
				</section> */}
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
