import React, { useEffect } from 'react';
import { CryptoOpreationsHistoryContainer } from './CryptoOperationHistory';
import { CryptoResultLayout } from './CryptoResult';
import { MyCriptoPortfolioList } from './CryptoPortfolioList';
import { TopRowCardsLayout } from '../CryptoPage/CryptoCards/TopRowCardsLayout';
import { CryptoBalanceChart, TopGainerAndLooserChart } from './Charts';
import { useDispatch } from 'react-redux';
import { fetchCoinsPrices } from '../../store/actions/async/fetchCoinsPrices';
import { fetchCryptoAssets } from '../../store/actions/async/fetchCryptoAssets';

export const CryptoLayout = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchCoinsPrices());
	}, []);

	useEffect(() => {
		dispatch(fetchCryptoAssets());
	}, []);
	return (
		<section className="flex flex-col flex-20/24 gap-4">
			<TopRowCardsLayout />
			<div id="layout__crypto" className="flex flex-col flex-6/12 rounded-4xl gap-4">
				<div id="crypto__top-container" className="flex flex-5/12 flex-row gap-4">
					<CryptoResultLayout />
					{/* <CryptoBalanceChart /> */}
				</div>
				<div id="crypto__bottom-container" className="flex flex-7/12  flex-col gap-4">
					<div
						id="row__accounts-and-history"
						className="flex xl:flex-nowrap flex-wrap flex-10/12 gap-4"
					>
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
