import React from 'react';
import { CryptoOpreationsHistoryContainer } from './CryptoOperationHistory';
import { CryptoResultLayout } from './CryptoResult';
import { MyCriptoPortfolioList } from './components/MyCryptoPortfolioList/MyCriptoPortfolioList';
import { TopRowCardsLayout } from '../CryptoPage/CryptoCards/TopRowCardsLayout';
import { CryptoBalanceChart, TopGainerAndLooserChart } from './Charts';

export const CryptoLayout = () => {
	return (
		<section className="flex flex-col gap-4">
			<TopRowCardsLayout />
			<div
				id="layout__crypto"
				className="flex flex-col flex-5 2xl:flex-nowrap flex-wrap rounded-4xl gap-4"
			>
				<div id="crypto__top-container" className="flex flex-5/12 flex-row gap-4">
					<div className="flex flex-8/12 w-full bg-amber-500">
						<CryptoResultLayout />
					</div>
					<CryptoBalanceChart />
				</div>
				<div id="crypto__bottom-container" className="flex flex-7/12 flex-col gap-4">
					<div id="row__accounts-and-history" className="flex flex-10/12 gap-4">
						<MyCriptoPortfolioList />
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
