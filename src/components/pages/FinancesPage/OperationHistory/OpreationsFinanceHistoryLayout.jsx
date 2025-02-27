import React, { useState, useMemo } from 'react';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import { FinanceOperationHistory } from './FinanceOperationHistory.jsx';
import { history } from '../../../../db.js';
import OutlineButton from '../../../buttons/OutlineButton.jsx';
import { getHIstoryInCurrency } from '../../../../utils/getHIstoryInCurrency.js';
import { SortSelector } from '../../../sortSelector/sortSelector.jsx';
import { getsortedHistory } from '../../../../utils/getSortedHistory.js';
import { SectionContainerHeader } from '../../../SectionContainerHeader/SectionContainerHeader.jsx';
import { FixedSizeList as List } from 'react-window';

export const OpreationsFinanceHistoryLayout = ({ isUSD, rubleCourse }) => {
	const [sortType, setSortType] = useState('newest');

	const filteredHistory = useMemo(() => {
		return getHIstoryInCurrency(history, isUSD, rubleCourse).filter(
			(operation) => operation.tag === 'finance',
		);
	}, [isUSD, rubleCourse, history]);

	const sortedHistory = useMemo(() => {
		return getsortedHistory(filteredHistory, sortType);
	}, [filteredHistory, sortType]);

	const handleSortChange = (event) => setSortType(event.target.value);

	const Row = ({ index, style }) => {
		const operation = sortedHistory[index];
		return (
			<div style={style} key={operation.id}>
				<FinanceOperationHistory
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
				<OutlineButton to={''} disabled={false} icon={EditIcon} alt="change history">
					<span className="text-base">Изменить</span>
				</OutlineButton>
			</div>
			<div
				id="operationsHistoryBoxWrapper"
				className="flex flex-col max-h-[56vh] gap-3 rounded-2xl pr-1 pt-1 "
			>
				<List
					className="overflow-y-auto overscroll-auto scroll-smooth scrollbar"
					height={700}
					itemCount={sortedHistory.length}
					itemSize={64}
					width="100%"
				>
					{Row}
				</List>
			</div>
		</div>
	);
};
