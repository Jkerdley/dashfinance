import React from 'react';
import { SectionContainerHeader } from '../../../SectionContainerHeader/SectionContainerHeader';

export const TopGainerAndLooserChart = ({ data, title }) => {
	return (
		<div id="column__income-chart" className="flex flex-1 p-4 rounded-3xl  bg-sky-950/40">
			<SectionContainerHeader title={title} />
		</div>
	);
};
