import React from 'react';

export const SortSelector = ({ handleSortChange, sortType }) => {
	return (
		<select
			className="flex gap-2 bg-sky-950/40 rounded-xl px-2 py-1 outline-none border-none cursor-pointer hover:bg-sky-900/40 transition-all duration-150 ease-in-out"
			name="history sort"
			id="history"
			value={sortType}
			onChange={handleSortChange}
		>
			<option className=" bg-sky-950/40" value="newest">
				По дате
			</option>
			<option value="oldest">Сначала старые</option>
			<option value="alphabet">По алфавиту</option>
			<option value="amountUp">По сумме ↑</option>
			<option value="amountDown">По сумме ↓</option>
		</select>
	);
};
