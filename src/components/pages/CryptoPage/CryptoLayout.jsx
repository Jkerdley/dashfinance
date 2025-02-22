import React from 'react';
import { OpreationsHistoryLayout } from './OperationHistory';
import { CryptoResultLayout } from './CryptoResult';
import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../store/selectors';
import { OperationsPanel } from '../../OperationsPanelButtons/OperationsPanel';
import { ResultChart } from './Charts/ResultChart';
import { MyCriptoPortfolioList } from './components/MyCryptoPortfolioList/MyCriptoPortfolioList';
import { TopRowCardsLayout } from '../CryptoPage/CryptoCards/TopRowCardsLayout';
import { TopTenLayout } from './TopTenCryptos';

export const CryptoLayout = () => {
	const isUSD = useSelector(currencySelector);
	const rubleCourse = useSelector(rubleCourseSelector);

	return (
		<div className="flex flex-col gap-4">
			<TopRowCardsLayout />
			<div id="layout__crypto" className="flex flex-16 2xl:flex-nowrap flex-wrap rounded-4xl gap-4">
				<div className="flex flex-8 flex-col gap-4">
					<CryptoResultLayout isUSD={isUSD} rubleCourse={rubleCourse} />
					<div id="row__accounts-and-history" className="flex flex-10 gap-4">
						<div id="operations__and__accounts-container" className="flex flex-col flex-2 gap-4">
							<OperationsPanel onClick={''} />
							<TopTenLayout isUSD={isUSD} rubleCourse={rubleCourse} />
						</div>
						<OpreationsHistoryLayout isUSD={isUSD} rubleCourse={rubleCourse} />
					</div>
				</div>
				<div className="flex flex-6 flex-row 2xl:flex-col gap-4">
					<MyCriptoPortfolioList isUSD={isUSD} rubleCourse={rubleCourse} />
					<ResultChart />
				</div>
			</div>
		</div>
	);
};
