import React, { useState } from 'react';
import { history } from '../../../db';
import { aggregateChartDataByMonth, filteredByThisMonth, getsortedHistory } from '../../../utils';
import { useSelector } from 'react-redux';
import { currencySelector, rubleCourseSelector } from '../../../store/selectors';
import { ChartSelector } from '../../../components/sortSelector/chartSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import FinanceChart from './FinanceChart';

export const FinanceAddAndSpendChartContainer = () => {
	const [selectedSortType, setSelectedSortType] = useState('month');
	const isUSD = useSelector(currencySelector);
	const roubleCourse = useSelector(rubleCourseSelector);

	const filteredHistoryForChart = history.filter((operation) => operation.tag === 'finance');

	const sortedHistory = getsortedHistory(
		filteredByThisMonth(filteredHistoryForChart, selectedSortType),
		'oldest',
	);

	const aggregatedData = aggregateChartDataByMonth(sortedHistory, selectedSortType);
	const mappedData = aggregatedData.map((item) => {
		return {
			...item,
			Доходы: isUSD ? (item.Доходы / roubleCourse).toFixed(2) : item.Доходы.toFixed(2),
			Расходы: isUSD ? (item.Расходы / roubleCourse).toFixed(2) : item.Расходы.toFixed(2),
			Баланс: isUSD ? (item.Баланс / roubleCourse).toFixed(2) : item.Баланс.toFixed(2),
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
			<FinanceChart mappedData={mappedData} />
		</div>
	);
};
