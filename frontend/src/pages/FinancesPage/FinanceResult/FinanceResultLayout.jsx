import React, { useState } from 'react';
import { RefreshCourseButton } from '../../../components/buttons';
import { FinanceResult } from './FinanceResult';

import { RadialChartSelector } from '../../../components/sortSelector/RadialChartSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { useCurrency } from '../../../hooks';

export const FinanceResultLayout = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const [selectedRadialSortType, setSelectedRadialSortType] = useState('month');

	const handleRadialSortChange = () => {
		setSelectedRadialSortType(selectedRadialSortType === 'month' ? 'thisYear' : 'month');
	};

	return (
		<div
			id="col__finance-result-container"
			className="flex flex-col flex-4 gap-2 p-4 rounded-3xl bg-sky-950/40 transition-all"
		>
			<div id="finance-result__and__course-button" className="flex justify-between gap-2">
				<SectionContainerHeader title={'Финансовый результат'} />
				<RadialChartSelector
					handleRadialSortChange={handleRadialSortChange}
					selectedSortType={selectedRadialSortType}
				/>
				<RefreshCourseButton />
			</div>
			<FinanceResult
				selectedSortType={selectedRadialSortType}
				isUSD={isUSD}
				rubleCourse={rubleCourse}
			/>
		</div>
	);
};
