import React, { useState } from 'react';
import { RefreshCourseButton } from '../../../components/buttons';
import { FinanceResult } from './FinanceResult';
import { RadialChartSelector } from '../../../components/sortSelector/RadialChartSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';

export const FinanceResultLayout = ({ isMainPage }) => {
	const [selectedRadialSortType, setSelectedRadialSortType] = useState('month');

	const handleRadialSortChange = () => {
		setSelectedRadialSortType(selectedRadialSortType === 'month' ? 'thisYear' : 'month');
	};

	return (
		<div
			id="col__finance-result-container"
			className="flex flex-col flex-7 gap-2 p-4 rounded-3xl bg-sky-950/40 transition-all"
		>
			<div id="finance-result__and__course-button" className="flex justify-between gap-2">
				<SectionContainerHeader title={'Финансовый результат'} />
				{isMainPage ? '' : <RefreshCourseButton title={'Обновить курс USD'} />}
				<RadialChartSelector
					handleRadialSortChange={handleRadialSortChange}
					selectedSortType={selectedRadialSortType}
				/>
			</div>
			<FinanceResult selectedSortType={selectedRadialSortType} />
		</div>
	);
};
