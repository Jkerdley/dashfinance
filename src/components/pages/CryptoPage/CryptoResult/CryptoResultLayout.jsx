import React from 'react';
import { RefreshCourseButton } from '../../../buttons';
import { CryptoResult } from './CryptoResult';
import { SectionContainerHeader } from '../../../SectionContainerHeader/SectionContainerHeader';

export const CryptoResultLayout = ({ isUSD, rubleCourse }) => {
	return (
		<div
			id="col__finance-result-container"
			className="flex flex-col flex-4 min-h-[26vh] gap-2 p-4 rounded-3xl bg-sky-950/40"
		>
			<div id="finance-result__and__course-button" className="flex justify-between gap-2">
				<SectionContainerHeader title={'Крипто портфолио'} />
				<RefreshCourseButton />
			</div>

			<CryptoResult isUSD={isUSD} rubleCourse={rubleCourse} />
		</div>
	);
};
