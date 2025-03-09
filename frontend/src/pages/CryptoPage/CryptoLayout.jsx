import React from 'react';
import { CryptoOpreationsHistoryContainer } from './CryptoOperationHistory';
import { CryptoResultLayout } from './CryptoResult';
import { MyCriptoPortfolioList } from './CryptoPortfolioList';
import { TopRowCardsLayout } from '../CryptoPage/CryptoCards/TopRowCardsLayout';
import { TopGainerAndLooserChart } from './Charts';
import { useFetchCryptoAssetsInCurrency } from '../../hooks/useFetchCryptoAssetsInCurrency';
import { Loader } from '../../components/Loaders/Loader';
import { useSelector } from 'react-redux';
import { selectCryptoCoins } from '../../store/selectors';

export const CryptoLayout = () => {
	const { cryptoAssetsInCurrency, isLoading } = useFetchCryptoAssetsInCurrency();
	const cryptoCoins = useSelector(selectCryptoCoins);
	console.log('cryptoAssetsInCurrency', cryptoAssetsInCurrency);

	return isLoading ? (
		<Loader />
	) : (
		<section className="flex flex-col flex-20/24 gap-4">
			<TopRowCardsLayout cryptoCoins={cryptoCoins} />
			<div id="layout__crypto" className="flex flex-col flex-6/12 rounded-4xl gap-4">
				<div id="crypto__top-container" className="flex flex-5/12 flex-row gap-4">
					<CryptoResultLayout
						cryptoAssetsInCurrency={cryptoAssetsInCurrency}
						isLoading={isLoading}
					/>
				</div>
				<div id="crypto__bottom-container" className="flex flex-7/12 flex-col gap-4">
					<div
						id="row__accounts-and-history"
						className="flex xl:flex-nowrap flex-wrap flex-10/12 gap-4"
					>
						<MyCriptoPortfolioList
							cryptoAssetsInCurrency={cryptoAssetsInCurrency}
							isLoading={isLoading}
						/>
						<CryptoOpreationsHistoryContainer />
						<section className="flex flex-col flex-2/12 gap-4">
							<TopGainerAndLooserChart
								data={cryptoAssetsInCurrency}
								title={'Топ роста (1d)'}
								type={'gainer'}
								isLoading={isLoading}
							/>
							<TopGainerAndLooserChart
								data={cryptoAssetsInCurrency}
								title={'Топ лузер (1d)'}
								type={'looser'}
								isLoading={isLoading}
							/>
						</section>
					</div>
				</div>
			</div>
		</section>
	);
};
