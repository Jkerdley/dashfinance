import React, { useState, useCallback, useMemo } from 'react';
import { FinanceOperationHistory } from './FinanceOperationHistory.jsx';
import { SortSelector } from '../../../components/sortSelector/sortSelector.jsx';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader.jsx';
import { FixedSizeList as List } from 'react-window';
import { Loader } from '../../../components/Loaders/Loader.jsx';
import { useGetHistoryQuery } from '../../../store/api/backendApi';
import { useCurrency } from '../../../hooks';
import { getHIstoryInCurrency } from '../../../utils/getHIstoryInCurrency';
import { getsortedHistory } from '../../../utils/getSortedHistory';

export const OpreationsFinanceHistoryLayout = ({ inMainPage }) => {
	const [sortType, setSortType] = useState('newest');
	const { isUSD, rubleCourse } = useCurrency();
	const { data: financeHistory = [], isLoading: fetchHistoryIsLoading } = useGetHistoryQuery();

	const filteredHistory = useMemo(() => {
		return getHIstoryInCurrency(financeHistory, isUSD, rubleCourse);
	}, [isUSD, rubleCourse, financeHistory]);

	const sortedHistory = useMemo(() => {
		return getsortedHistory(filteredHistory, sortType);
	}, [filteredHistory, sortType]);

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
			className="flex flex-col flex-7/12 p-4 lg:h-full rounded-3xl bg-sky-950/40 gap-4"
		>
			<div className="flex flex-wrap sm:flex-nowrap justify-between gap-2">
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
					className={`flex flex-col  ${inMainPage ? 'max-h-[44vh]' : 'max-h-[44vh]'} gap-3 rounded-2xl pr-1 pt-1`}
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
