import React from 'react';

export const ChartSelector = ({ handleSortChange, selectedSortType }) => {
	return (
		<select
			className="flex gap-2 items-center justify-center bg-sky-900/40 rounded-xl px-2 outline-none border-none cursor-pointer hover:bg-sky-900/40 transition-all duration-150 ease-in-out"
			name="finance chart sort"
			id="finance-chart"
			value={selectedSortType}
			onChange={handleSortChange}
		>
			<option className=" bg-sky-950/40" value="days">
				По дням
			</option>
			<option className=" bg-sky-950/40" value="month">
				По месяцам
			</option>
		</select>
	);
};
