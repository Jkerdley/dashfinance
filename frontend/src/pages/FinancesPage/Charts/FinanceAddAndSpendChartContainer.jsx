import React, { useState } from 'react';
import { aggregateChartDataByMonth, filteredByThisMonth, getsortedHistory } from '../../../utils';
import { useSelector } from 'react-redux';
import { selectHistory } from '../../../store/selectors';
import { ChartSelector } from '../../../components/sortSelector/chartSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import FinanceChart from './FinanceChart';
import { useCurrency } from '../../../hooks';

export const FinanceAddAndSpendChartContainer = () => {
	const [selectedSortType, setSelectedSortType] = useState('month');
	const { isUSD, rubleCourse } = useCurrency();
	const financeHistory = useSelector(selectHistory);

	const sortedHistory = getsortedHistory(filteredByThisMonth(financeHistory, selectedSortType), 'oldest');
	const aggregatedData = aggregateChartDataByMonth(sortedHistory, selectedSortType);
	const mappedData = aggregatedData.map((item) => {
		return {
			...item,
			Доходы: isUSD ? (item.Доходы / rubleCourse).toFixed(2) : item.Доходы.toFixed(2),
			Расходы: isUSD ? (item.Расходы / rubleCourse).toFixed(2) : item.Расходы.toFixed(2),
			Баланс: isUSD ? (item.Баланс / rubleCourse).toFixed(2) : item.Баланс.toFixed(2),
		};
	});

	const handleSortChange = () => {
		if (selectedSortType === 'month') {
			setSelectedSortType('allTime');
		} else {
			setSelectedSortType('month');
		}
	};

	return (
		<div id="column__income-chart" className="flex flex-col flex-6 p-4 rounded-3xl bg-sky-950/40">
			<div className="flex gap-4 justify-between">
				<SectionContainerHeader title={'График доходов и расходов'} />
				<ChartSelector handleSortChange={handleSortChange} selectedSortType={selectedSortType} />
			</div>
			{mappedData.length === 0 ? (
				<span className="flex items-center justify-center mt-30">Нет расходов и доходов</span>
			) : (
				<FinanceChart mappedData={mappedData} />
			)}
		</div>
	);
};
