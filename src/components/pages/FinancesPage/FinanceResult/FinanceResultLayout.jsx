import React, { useState } from 'react';
import { RefreshCourseButton } from '../../../buttons';
import { FinanceResult } from './FinanceResult';

import { RadialChartSelector } from '../../../sortSelector/RadialChartSelector';

export const FinanceResultLayout = ({ isUSD, rubleCourse }) => {
	const [selectedRadialSortType, setSelectedRadialSortType] = useState('days');

	const handleRadialSortChange = () => {
		setSelectedRadialSortType(selectedRadialSortType === 'days' ? 'thisYear' : 'days');
	};

	return (
		<div
			id="col__finance-result-container"
			className="flex flex-col flex-4 gap-2 p-4 rounded-3xl bg-sky-950/40"
		>
			<div id="finance-result__and__course-button" className="flex justify-between gap-2">
				<span className="font-medium text-xl">Финансовый результат</span>
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
