import React from 'react';
import { OpreationsFinanceHistoryLayout } from './OperationHistory';
import { CategoriesLayout } from './Categories';
import { FinanceResultLayout } from './FinanceResult';
import { OperationsPanel } from '../../components/OperationsPanelButtons/OperationsPanel';
import { AccountsLayout } from './FinanceAccount/AccountsLayout';
import { FinanceAddAndSpendChartContainer } from '../FinancesPage/Charts';

export const FinancesLayout = () => {
	return (
		<section
			id="layout__finances"
			className="flex flex-10/12 2xl:flex-nowrap flex-wrap rounded-4xl gap-4"
		>
			<div className="flex flex-8/12 flex-col gap-4">
				<FinanceResultLayout />
				<div
					id="row__accounts-and-history"
					className="flex flex-wrap lg:flex-nowrap flex-6/12 gap-4 h-full"
				>
					<div
						id="operations__and__accounts-container"
						className="flex flex-col flex-5/12 min-w-42% gap-4"
					>
						<OperationsPanel />
						<AccountsLayout />
					</div>
					<OpreationsFinanceHistoryLayout />
				</div>
			</div>
			<div className="flex flex-wrap flex-6/12 flex-row 2xl:flex-col gap-4">
				<CategoriesLayout />
				<FinanceAddAndSpendChartContainer />
			</div>
		</section>
	);
};
