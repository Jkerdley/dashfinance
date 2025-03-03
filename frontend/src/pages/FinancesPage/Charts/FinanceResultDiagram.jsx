import React from 'react';
import { Loader } from '../../../components/Loaders/Loader';
import { useSelector } from 'react-redux';
import { selectHistory, selectHistoryIsLoading } from '../../../store/selectors';
import { aggregateExpensesByCategory, filteredByThisMonth, getsortedHistory } from '../../../utils';
import { useCurrency } from '../../../hooks';
import { PieDiagramChart } from '../../../components/Charts/PieDiagramChart';

export const FinanceResultDiagram = ({ selectedSortType }) => {
	const { isUSD, rubleCourse } = useCurrency();
	const financeHistory = useSelector(selectHistory);
	const historyIsLoading = useSelector(selectHistoryIsLoading);
	const filteredHistoryForChart = financeHistory.filter((operation) => operation.type === 'spend');

	const sortedHistory = getsortedHistory(
		filteredByThisMonth(filteredHistoryForChart, selectedSortType),
		'oldest',
	);
	const expensesByCategory = aggregateExpensesByCategory(sortedHistory);
	console.log('expensesByCategory', expensesByCategory);
	const mappedData = expensesByCategory.map((item) => {
		return {
			...item,
			value: isUSD
				? parseFloat((item.value / rubleCourse).toFixed(2))
				: parseFloat(item.value.toFixed(2)),
		};
	});

	return (
		<div id="column__income-chart" className="flex relative items-center justify-center">
			<span className="absolute top-44 text-md font-medium text-center text-white/70">
				{mappedData.length === 0 ? '' : `Расходы`}
			</span>
			{historyIsLoading ? (
				<Loader />
			) : mappedData.length === 0 ? (
				<span className="text-center">Нет расходов в этот период</span>
			) : (
				<PieDiagramChart mappedData={mappedData} />
			)}
		</div>
	);
};
