import React from 'react';
import { OpreationsHistoryLayout } from './OperationHistory';
import { CategoriesLayout } from './Categories';
import { FinanceResultLayout } from './FinanceResult';
import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../store/selectors';
import { OperationsPanel } from '../../OperationsPanelButtons/OperationsPanel';
import { AccountsLayout } from './FinanceAccount/AccountsLayout';

export const FinancesLayout = () => {
	const isUSD = useSelector(currencySelector);
	const rubleCourse = useSelector(rubleCourseSelector);

	return (
		<div id="layout__finances" className="flex flex-16 2xl:flex-nowrap flex-wrap rounded-4xl gap-4">
			<div className="flex flex-8 flex-col gap-4">
				<FinanceResultLayout isUSD={isUSD} rubleCourse={rubleCourse} />
				<div id="row__accounts-and-history" className="flex flex-10 gap-4">
					<div id="operations__and__accounts-container" className="flex flex-col flex-2 gap-4">
						<OperationsPanel onClick={''} />
						<AccountsLayout isUSD={isUSD} rubleCourse={rubleCourse} />
					</div>
					<OpreationsHistoryLayout isUSD={isUSD} rubleCourse={rubleCourse} />
				</div>
			</div>
			<CategoriesLayout isUSD={isUSD} rubleCourse={rubleCourse} />
		</div>
	);
};
