import React from 'react';
import { Loader } from '../../../components/Loaders/Loader';
import { useFinanceExpensesFromHistory } from '../../../hooks';
import { PieDiagramChart } from '../../../components/Charts/PieDiagramChart';

export const FinanceResultDiagram = ({ selectedSortType }) => {
	// const startTime = performance.now();
	const { mappedData, historyIsLoading } = useFinanceExpensesFromHistory({
		selectedSortType,
		showInCategories: false,
	});

	// console.log('FinanceResultDiagram render time:', performance.now() - startTime);
	return (
		<div id="column__income-chart" className="flex relative items-center justify-center">
			<span className="absolute top-3/4 left-1/2 transform -translate-x-1/2 text-md font-medium text-center text-white/70">
				{mappedData.length === 0 ? '' : `Расходы`}
			</span>
			{historyIsLoading ? (
				<Loader />
			) : mappedData.length === 0 ? (
				<span className="text-center">Нет расходов в этот период</span>
			) : (
				<PieDiagramChart mappedData={mappedData} isCrypto={false} />
			)}
		</div>
	);
};
