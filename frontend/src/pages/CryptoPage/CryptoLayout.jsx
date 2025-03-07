import React from 'react';
import { CryptoOpreationsHistoryContainer } from './CryptoOperationHistory';
import { CryptoResultLayout } from './CryptoResult';
import { MyCriptoPortfolioList } from './CryptoPortfolioList';
import { TopRowCardsLayout } from '../CryptoPage/CryptoCards/TopRowCardsLayout';
import { CryptoBalanceChart, TopGainerAndLooserChart } from './Charts';
import { useFetchCryptoAssetsInCurrency } from '../../hooks/useFetchCryptoAssetsInCurrency';
import { Loader } from '../../components/Loaders/Loader';

export const CryptoLayout = () => {
	const { cryptoAssetsInCurrency, isLoading } = useFetchCryptoAssetsInCurrency();

	return isLoading ? (
		<Loader />
	) : (
		<section className="flex flex-col flex-20/24 gap-4">
			<TopRowCardsLayout cryptoAssetsInCurrency={cryptoAssetsInCurrency} isLoading={isLoading} />
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
							<TopGainerAndLooserChart title={'Топ роста (за день)'} />
							<TopGainerAndLooserChart title={'Топ лузер (за день)'} />
						</section>
					</div>
				</div>
			</div>
		</section>
	);
};
