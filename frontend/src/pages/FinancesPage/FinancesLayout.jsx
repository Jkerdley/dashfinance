import React from 'react';
import { OpreationsFinanceHistoryLayout } from './OperationHistory';
import { CategoriesLayout } from './Categories';
import { FinanceResultLayout } from './FinanceResult';

import { OperationsPanel } from '../../components/OperationsPanelButtons/OperationsPanel';
import { AccountsLayout } from './FinanceAccount/AccountsLayout';
import { FinanceAddAndSpendChartContainer } from '../FinancesPage/Charts';
import { ModalWindowLayout } from '../../components/modalWindow/ModalWindowLayout';

export const FinancesLayout = () => {
	return (
		<div id="layout__finances" className="flex flex-16 2xl:flex-nowrap flex-wrap rounded-4xl gap-4">
			<ModalWindowLayout />
			<div className="flex flex-10 flex-col gap-4">
				<FinanceResultLayout />
				<div id="row__accounts-and-history" className="flex flex-10 gap-4">
					<div
						id="operations__and__accounts-container"
						className="flex flex-col flex-3 min-w-42% gap-4"
					>
						<OperationsPanel />
						<AccountsLayout />
					</div>
					<OpreationsFinanceHistoryLayout />
				</div>
			</div>
			<div className="flex flex-7 flex-row 2xl:flex-col gap-4">
				<CategoriesLayout />
				<FinanceAddAndSpendChartContainer />
			</div>
		</div>
	);
};
