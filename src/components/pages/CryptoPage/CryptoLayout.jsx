import React from 'react';
import { CryptoOpreationsHistoryLayout } from './OperationHistory';
import { CryptoResultLayout } from './CryptoResult';
import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../store/selectors';
import { ResultChart } from './Charts/ResultChart';
import { MyCriptoPortfolioList } from './components/MyCryptoPortfolioList/MyCriptoPortfolioList';
import { TopRowCardsLayout } from '../CryptoPage/CryptoCards/TopRowCardsLayout';
import { TopGainerAndLooserChart } from './Charts';

export const CryptoLayout = () => {
	const isUSD = useSelector(currencySelector);
	const rubleCourse = useSelector(rubleCourseSelector);

	return (
		<div className="flex flex-col gap-4">
			<TopRowCardsLayout />
			<div
				id="layout__crypto"
				className="flex flex-col flex-5 2xl:flex-nowrap flex-wrap rounded-4xl gap-4"
			>
				<div id="crypto__result-and-chart__container" className="flex flex-6 flex-row gap-4">
					<div className="flex flex-8 w-full">
						<CryptoResultLayout isUSD={isUSD} rubleCourse={rubleCourse} />
					</div>
					<ResultChart />
				</div>
				<div className="flex flex-8 flex-col gap-4">
					<div id="row__accounts-and-history" className="flex flex-10 gap-4">
						<MyCriptoPortfolioList isUSD={isUSD} rubleCourse={rubleCourse} />

						<CryptoOpreationsHistoryLayout isUSD={isUSD} rubleCourse={rubleCourse} />
						<section className="flex flex-col flex-2 gap-4">
							<TopGainerAndLooserChart title={'Топ роста'} />
							<TopGainerAndLooserChart title={'Топ лузер'} />
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};
