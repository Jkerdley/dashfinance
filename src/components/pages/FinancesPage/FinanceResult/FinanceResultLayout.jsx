import React, { useState } from 'react';
import { RefreshCourseButton } from '../../../buttons';
import { FinanceResult } from './FinanceResult';
import { ChartSelector } from '../../../sortSelector/chartSelector';

export const FinanceResultLayout = ({ isUSD, rubleCourse }) => {
	const [selectedSortType, setSelectedSortType] = useState('days');

	const handleSortChange = () => {
		setSelectedSortType(selectedSortType === 'days' ? 'month' : 'days');
	};

	return (
		<div
			id="col__finance-result-container"
			className="flex flex-col flex-4 gap-2 p-4 rounded-3xl bg-sky-950/40"
		>
			<div id="finance-result__and__course-button" className="flex justify-between gap-2">
				<span className="font-medium text-2xl">Финансовый результат</span>
				<ChartSelector handleSortChange={handleSortChange} selectedSortType={selectedSortType} />
				<RefreshCourseButton />
			</div>
			<FinanceResult selectedSortType={selectedSortType} isUSD={isUSD} rubleCourse={rubleCourse} />
		</div>
	);
};
