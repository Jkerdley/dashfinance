import React, { useState } from 'react';
import EditIcon from '../../../../assets/icons/edit-icon.svg';
import { CryptoOperationHistory } from './OperationHistory';
import { fetchedCoinsPrices, history } from '../../../../db.js';
import OutlineButton from '../../../buttons/OutlineButton.jsx';
import { getHIstoryInCurrency } from '../../../../utils/getHIstoryInCurrency.js';

export const CryptoOpreationsHistoryLayout = ({ isUSD, rubleCourse }) => {
	const [sortType, setSortType] = useState('newest');

	const findAccountName = (assetId) => {
		const account = fetchedCoinsPrices.result.find((accountItem) => assetId === accountItem.id);
		return account ? account.symbol : null;
	};

	const findCoinIcon = (coinId) => {
		const coin = fetchedCoinsPrices.result.find((coinItem) => coinId === coinItem.id);
		return coin ? coin.icon : null;
	};
	const findCoinSymbol = (coinId) => {
		const coin = fetchedCoinsPrices.result.find((coinItem) => coinId === coinItem.id);
		return coin ? coin.symbol : null;
	};

	const filteredHistory = getHIstoryInCurrency(history, isUSD, rubleCourse).filter(
		(operation) => operation.tag === 'crypto',
	);

	const toSorted = () => {
		if (sortType === 'newest') {
			return [...filteredHistory].sort((a, b) => {
				const [dayA, monthA, yearA] = a.date.split('.');
				const [dayB, monthB, yearB] = b.date.split('.');
				return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
			});
		} else if (sortType === 'oldest') {
			return [...filteredHistory].sort((a, b) => {
				const [dayA, monthA, yearA] = a.date.split('.');
				const [dayB, monthB, yearB] = b.date.split('.');
				return new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB);
			});
		} else if (sortType === 'alphabet') {
			return [...filteredHistory].sort((a, b) => a.asset.localeCompare(b.asset));
		} else if (sortType === 'amountUp') {
			return [...filteredHistory].sort((a, b) => Number(a.amount.slice(2)) - Number(b.amount.slice(2)));
		} else if (sortType === 'amountDown') {
			return [...filteredHistory].sort((a, b) => Number(b.amount.slice(2)) - Number(a.amount.slice(2)));
		}
	};

	const handleSortChange = (event) => setSortType(event.target.value);

	return (
		<div
			id="accouts__operations-history-container"
			className="flex flex-col flex-5 p-4 rounded-3xl bg-sky-950/40 gap-4"
		>
			<div className="flex justify-between gap-2">
				<span className=" text-2xl font-medium">История операций</span>
				<select
					className="flex gap-2 bg-sky-950/40 rounded-xl px-2 py-1 outline-none border-none cursor-pointer hover:bg-sky-900/40 transition-colors"
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
				<OutlineButton to={''} disabled={false} icon={EditIcon} alt="change history">
					<span className="text-base">Изменить</span>
				</OutlineButton>
			</div>

			<div
				id="operationsHistoryBoxWrapper"
				className="flex flex-col max-h-[42vh] gap-3 rounded-2xl pr-1 pt-1 overflow-y-auto overscroll-auto scroll-smooth scrollbar"
			>
				{toSorted().map((operation) => {
					return (
						<div key={operation.id}>
							<CryptoOperationHistory
								coin={operation.asset}
								symbol={findCoinSymbol(operation.assetId)}
								icon={findCoinIcon(operation.assetId)}
								price={operation.price}
								operationAmount={operation.amount}
								assetAmount={operation.assetAmount}
								operationType={operation.type}
								accountName={findAccountName(operation.check)}
								operationDate={operation.date}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
