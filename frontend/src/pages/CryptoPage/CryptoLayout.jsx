import React from 'react';
import { CryptoOpreationsHistoryContainer } from './CryptoOperationHistory';
import { CryptoResultLayout } from './CryptoResult';
import { MyCriptoPortfolioList } from './CryptoPortfolioList';
import { TopRowCardsLayout } from '../CryptoPage/CryptoCards/TopRowCardsLayout';
import { GainerAndLooserLayout } from './Charts';
import { useFetchCryptoAssetsInCurrency } from '../../hooks/useFetchCryptoAssetsInCurrency';
import { Loader } from '../../components/Loaders/Loader';
import { useSelector } from 'react-redux';
import { selectCryptoCoins } from '../../store/selectors';

export const CryptoLayout = () => {
	const { cryptoAssetsInCurrency, isLoading } = useFetchCryptoAssetsInCurrency();
	const cryptoCoins = useSelector(selectCryptoCoins);

	return isLoading ? (
		<Loader />
	) : (
		<section className="flex flex-col flex-10/12 gap-4">
			<TopRowCardsLayout cryptoCoins={cryptoCoins} />
			<div id="layout__crypto" className="flex flex-col flex-11/12 rounded-4xl gap-4">
				<div id="crypto__top-container" className="flex flex-5/12 gap-4">
					<CryptoResultLayout
						cryptoAssetsInCurrency={cryptoAssetsInCurrency}
						isLoading={isLoading}
					/>
				</div>
				<div id="crypto__bottom-container" className="flex flex-7/12 2xl:flex-nowrap flex-wrap gap-4">
					<MyCriptoPortfolioList
						cryptoAssetsInCurrency={cryptoAssetsInCurrency}
						isLoading={isLoading}
					/>
					<CryptoOpreationsHistoryContainer />
					<GainerAndLooserLayout
						cryptoAssetsInCurrency={cryptoAssetsInCurrency}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</section>
	);
};
