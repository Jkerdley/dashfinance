import React, { useState, useMemo } from 'react';
import { List } from 'react-window';

import { FinanceOperationHistory } from './FinanceOperationHistory.jsx';
import { SortSelector } from '../../../components/sortSelector/sortSelector.jsx';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader.jsx';
import { Loader } from '../../../components/Loaders/Loader.jsx';
import { useGetHistoryQuery } from '../../../store/api/backendApi';
import { useCurrency } from '../../../hooks';
import { getHIstoryInCurrency } from '../../../utils/getHIstoryInCurrency';
import { getsortedHistory } from '../../../utils/getSortedHistory';
import { SORT_TYPES, VIRTUAL_LIST_CONFIG } from '../../../constants/operations.js';

const HistoryRow = ({ index, style, items }) => {
	const operation = items[index];
	if (!operation) return null;

	return (
		<div style={style}>
			<FinanceOperationHistory
				id={operation.id}
				operationType={operation.type}
				category={operation.category}
				operationComment={operation.comment}
				operationAmount={operation.amount}
				accountName={operation.account}
				operationDate={operation.date}
			/>
		</div>
	);
};

export const OperationsFinanceHistoryLayout = ({ inMainPage }) => {
	const [sortType, setSortType] = useState(SORT_TYPES.NEWEST);
	const { isUSD, rubleCourse } = useCurrency();
	const { data: financeHistory = [], isLoading: fetchHistoryIsLoading } = useGetHistoryQuery();

	const sortedHistory = useMemo(() => {
		const filtered = getHIstoryInCurrency(financeHistory, isUSD, rubleCourse) || [];
		return getsortedHistory(filtered, sortType) || [];
	}, [financeHistory, isUSD, rubleCourse, sortType]);

	const handleSortChange = (event) => setSortType(event.target.value);

	return (
		<section
			id="accouts__operations-history-container"
			className="flex flex-col flex-7/12 p-4 lg:h-full rounded-3xl bg-sky-950/40 gap-4"
		>
			<div className="flex flex-wrap sm:flex-nowrap justify-between gap-2">
				<SectionContainerHeader title="История операций" />
				<SortSelector handleSortChange={handleSortChange} sortType={sortType} />
			</div>

			{fetchHistoryIsLoading ? (
				<div className="flex flex-1 items-center justify-center">
					<Loader />
				</div>
			) : sortedHistory.length === 0 ? (
				<div className="flex flex-1 items-center justify-center text-slate-400">
					Операции отсутствуют
				</div>
			) : (
				<div
					id="operationsHistoryBoxWrapper"
					className="flex flex-col max-h-[44vh] gap-3 rounded-2xl pr-1 pt-1 overflow-hidden"
				>
					<List
						className="scrollbar overflow-x-hidden"
						height={VIRTUAL_LIST_CONFIG.LIST_HEIGHT}
						width="100%"
						rowCount={sortedHistory.length}
						rowHeight={VIRTUAL_LIST_CONFIG.ROW_HEIGHT}
						rowComponent={HistoryRow}
						rowProps={{ items: sortedHistory }}
					/>
				</div>
			)}
		</section>
	);
};
