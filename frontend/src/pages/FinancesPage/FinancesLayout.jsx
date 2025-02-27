import React from 'react';
import { OpreationsFinanceHistoryLayout } from './OperationHistory';
import { CategoriesLayout } from './Categories';
import { FinanceResultLayout } from './FinanceResult';
import { useDispatch, useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../store/selectors';
import { OperationsPanel } from '../../components/OperationsPanelButtons/OperationsPanel';
import { AccountsLayout } from './FinanceAccount/AccountsLayout';
import { FinanceAddAndSpendChartContainer } from '../FinancesPage/Charts';
import { closeModal, openModal } from '../../store/actions';
import { ModalWindowLayout } from '../../components/modalWindow/ModalWindowLayout';

export const FinancesLayout = () => {
	const isUSD = useSelector(currencySelector);
	const rubleCourse = useSelector(rubleCourseSelector);
	const dispatch = useDispatch();

	const handleOperationsClick = () => {
		dispatch(
			openModal({
				question: 'Добавить операцию?',
				onConfirm: () => {
					dispatch(closeModal());
					// Здесь добавить логику для сохранения операции
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	return (
		<div id="layout__finances" className="flex flex-16 2xl:flex-nowrap flex-wrap rounded-4xl gap-4">
			<ModalWindowLayout isUSD={isUSD} rubleCourse={rubleCourse} />
			<div className="flex flex-10 flex-col gap-4">
				<FinanceResultLayout isUSD={isUSD} rubleCourse={rubleCourse} />
				<div id="row__accounts-and-history" className="flex flex-10 gap-4">
					<div id="operations__and__accounts-container" className="flex flex-col flex-3 gap-4">
						<OperationsPanel onClick={handleOperationsClick} />
						<AccountsLayout isUSD={isUSD} rubleCourse={rubleCourse} />
					</div>
					<OpreationsFinanceHistoryLayout isUSD={isUSD} rubleCourse={rubleCourse} />
				</div>
			</div>
			<div className="flex flex-7 flex-row 2xl:flex-col gap-4">
				<CategoriesLayout isUSD={isUSD} rubleCourse={rubleCourse} />
				<FinanceAddAndSpendChartContainer />
			</div>
		</div>
	);
};
