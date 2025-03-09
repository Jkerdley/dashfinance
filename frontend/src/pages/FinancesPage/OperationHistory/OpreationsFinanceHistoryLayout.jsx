import React, { useState, useCallback } from 'react';
import { FinanceOperationHistory } from './FinanceOperationHistory.jsx';
import { SortSelector } from '../../../components/sortSelector/sortSelector.jsx';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader.jsx';
import { FixedSizeList as List } from 'react-window';
import { Loader } from '../../../components/Loaders/Loader.jsx';
import { fetchHistory } from '../../../store/actions/fetshHistory.js';
import { useFetchHistoryData } from '../../../hooks';
import { selectHistory, selectHistoryIsLoading } from '../../../store/selectors/select-history.js';

export const OpreationsFinanceHistoryContainer = ({ inMainPage }) => {
	const [sortType, setSortType] = useState('newest');
	const [sortedHistory, fetchHistoryIsLoading] = useFetchHistoryData(
		fetchHistory,
		sortType,
		selectHistory,
		selectHistoryIsLoading,
	);

	const handleSortChange = useCallback((event) => setSortType(event.target.value));

	const Row = ({ index, style }) => {
		const operation = sortedHistory[index];
		return (
			<div style={style} key={operation.id}>
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

	return (
		<div
			id="accouts__operations-history-container"
			className="flex flex-col flex-5 p-4 rounded-3xl bg-sky-950/40 gap-4"
		>
			<div className="flex justify-between gap-2">
				<SectionContainerHeader title={'История операций'} />
				<SortSelector handleSortChange={handleSortChange} sortType={sortType} />
			</div>
			{fetchHistoryIsLoading ? (
				<Loader />
			) : sortedHistory.length === 0 ? (
				<span className="flex items-center justify-center mt-20">Операции отсутствуют</span>
			) : (
				<div
					id="operationsHistoryBoxWrapper"
					className={`flex flex-col  ${inMainPage ? 'max-h-[41vh]' : 'max-h-[45vh]'} gap-3 rounded-2xl pr-1 pt-1`}
				>
					<List
						className="overflow-y-auto overscroll-auto scroll-smooth scrollbar"
						height={580}
						itemCount={sortedHistory.length}
						itemSize={64}
						width="100%"
					>
						{Row}
					</List>
				</div>
			)}
		</div>
	);
};
export const OpreationsFinanceHistoryLayout = React.memo(OpreationsFinanceHistoryContainer);
