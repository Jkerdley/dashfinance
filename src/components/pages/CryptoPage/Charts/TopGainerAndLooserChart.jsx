import React from 'react';

export const TopGainerAndLooserChart = ({ data, title }) => {
	return (
		<div id="column__income-chart" className="flex flex-1 p-4 rounded-3xl  bg-sky-950/40">
			<span className="text-xl font-medium">{title}</span>
		</div>
	);
};
