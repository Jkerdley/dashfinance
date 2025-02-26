import React, { useState } from 'react';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import { CryptoOperationHistory } from './OperationHistory';
import { fetchedCoinsPrices, history } from '../../../../db.js';
import OutlineButton from '../../../buttons/OutlineButton.jsx';
import { SortSelector } from '../../../sortSelector/sortSelector.jsx';
import {
	findAccountName,
	findCoinIcon,
	findCoinSymbol,
	getHIstoryInCurrency,
	getsortedHistory,
} from '../../../../utils';

export const CryptoOpreationsHistoryLayout = ({ isUSD, rubleCourse }) => {
	const [sortType, setSortType] = useState('newest');

	const filteredHistory = getHIstoryInCurrency(history, isUSD, rubleCourse).filter(
		(operation) => operation.tag === 'crypto',
	);
	const sortedHistory = getsortedHistory(filteredHistory, sortType);

	const handleSortChange = (event) => setSortType(event.target.value);

	return (
		<section
			id="accouts__operations-history-container"
			className="flex flex-col flex-6 p-4 rounded-3xl bg-sky-950/40 gap-4"
		>
			<div className="flex justify-between gap-2">
				<span className=" text-xl font-medium">История операций</span>
				<SortSelector handleSortChange={handleSortChange} sortType={sortType} />
				<OutlineButton to={''} disabled={false} icon={EditIcon} alt="change history">
					<span className="text-base">Изменить</span>
				</OutlineButton>
			</div>

			<div
				id="operationsHistoryBoxWrapper"
				className="flex flex-col max-h-[42vh] gap-3 rounded-2xl pr-1 pt-1 overflow-y-auto overscroll-auto scroll-smooth scrollbar"
			>
				{sortedHistory.map((operation) => {
					return (
						<div key={operation.id}>
							<CryptoOperationHistory
								coin={operation.asset}
								symbol={findCoinSymbol(fetchedCoinsPrices, operation.assetId)}
								icon={findCoinIcon(fetchedCoinsPrices, operation.assetId)}
								price={operation.price}
								operationAmount={operation.amount}
								assetAmount={operation.assetAmount}
								operationType={operation.type}
								accountName={findAccountName(fetchedCoinsPrices, operation.check)}
								operationDate={operation.date}
							/>
						</div>
					);
				})}
			</div>
		</section>
	);
};
