import React from 'react';

export const RadialChartSelector = ({ handleRadialSortChange, selectedSortType }) => {
	return (
		<select
			className="flex gap-2 items-center justify-center bg-sky-900/40 rounded-xl px-2 outline-none border-none cursor-pointer hover:bg-sky-900/40 transition-all duration-150 ease-in-out"
			name="finance chart sort"
			id="finance-chart"
			value={selectedSortType}
			onChange={handleRadialSortChange}
		>
			<option className=" bg-sky-950/40" value="days">
				За месяц
			</option>
			<option className=" bg-sky-950/40" value="thisYear">
				За этот год
			</option>
		</select>
	);
};
