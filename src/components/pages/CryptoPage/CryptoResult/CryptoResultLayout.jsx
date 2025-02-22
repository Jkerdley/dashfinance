import React from 'react';
import { RefreshCourseButton } from '../../../buttons';
import { CryptoResult } from './CryptoResult';

export const CryptoResultLayout = ({ isUSD, rubleCourse }) => {
	return (
		<div
			id="col__finance-result-container"
			className="flex flex-col flex-4 gap-2 p-4 rounded-3xl bg-sky-950/40"
		>
			<div id="finance-result__and__course-button" className="flex justify-between gap-2">
				<span className="font-medium text-2xl">Финансовый результат</span>
				<RefreshCourseButton />
			</div>
			<CryptoResult isUSD={isUSD} rubleCourse={rubleCourse} />
		</div>
	);
};
