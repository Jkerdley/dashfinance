import React, { useEffect } from 'react';
import { OpreationsFinanceHistoryLayout } from './OperationHistory';
import { CategoriesLayout } from './Categories';
import { FinanceResultLayout } from './FinanceResult';
import { OperationsPanel } from '../../components/OperationsPanelButtons/OperationsPanel';
import { AccountsLayout } from './FinanceAccount/AccountsLayout';
import { FinanceAddAndSpendChartContainer } from '../FinancesPage/Charts';
import { useCurrency } from '../../hooks';
import { getCourseAction } from '../../store/actions/async';
import { useDispatch } from 'react-redux';

export const FinancesLayout = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	useEffect(() => {
		console.log('rubleCourse in financelayout', rubleCourse);

		if (!rubleCourse) {
			dispatch(getCourseAction());
		}
	}, []);
	return (
		<section id="layout__finances" className="flex 2xl:flex-nowrap w-full flex-wrap rounded-4xl gap-4">
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
