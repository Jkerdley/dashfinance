import React from 'react';
import { FinanceResultLayout } from './FinanceResult';
import { OperationsPanel } from '../../components/OperationsPanelButtons/OperationsPanel';
import { AccountsLayout } from './FinanceAccount/AccountsLayout';
import { CategoriesLayout } from './Categories';
import { FinanceAddAndSpendChartContainer } from '../FinancesPage/Charts';
import { OperationsFinanceHistoryLayout } from './OperationHistory/OperationsFinanceHistoryLayout';

export const FinancesLayout = () => {
	return (
		<main id="layout__finances" className="flex flex-wrap w-full gap-4 rounded-4xl 2xl:flex-nowrap">
			<div className="flex flex-col gap-4 flex-8/12">
				<FinanceResultLayout />

				<div
					id="row__accounts-and-history"
					className="flex flex-wrap gap-4 h-full lg:flex-nowrap flex-6/12"
				>
					<div
						id="operations__and__accounts-container"
						className="flex flex-col gap-4 min-w-[42%] flex-5/12"
					>
						<OperationsPanel />
						<AccountsLayout />
					</div>

					<OperationsFinanceHistoryLayout />
				</div>
			</div>

			<div className="flex flex-row flex-wrap gap-4 flex-6/12 2xl:flex-col">
				<CategoriesLayout />
				<FinanceAddAndSpendChartContainer />
			</div>
		</main>
	);
};
