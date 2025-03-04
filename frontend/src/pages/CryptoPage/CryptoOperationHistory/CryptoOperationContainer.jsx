import React, { useState } from 'react';
import EditIcon from '../../../assets/icons/edit-icon.svg';
import { CryptoOperationHistory } from './CryptoOperationHistory.jsx';
import { fetchedCoinsPrices } from '../../../db.js';
import { SortSelector } from '../../../components/sortSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader.jsx';
import { EditAddDeleteButton } from '../../../components/buttons';
import { findAccountName, findCoinIcon, findCoinSymbol } from '../../../utils/findCoinUtils.js';
import { useFetchHistoryData } from '../../../hooks/useFetchServerHistory.js';
import { selectCryptoAssetsHistory, selectCryptoAssetsIsLoading } from '../../../store/selectors';
import { Loader } from '../../../components/Loaders/Loader.jsx';
import { fetchCryptoAssets } from '../../../store/actions/async/fetchCryptoAssets.js';

export const CryptoOpreationsHistoryContainer = () => {
	const [sortType, setSortType] = useState('newest');

	const [sortedHistory, fetchHistoryIsLoading] = useFetchHistoryData(
		fetchCryptoAssets,
		sortType,
		selectCryptoAssetsHistory,
		selectCryptoAssetsIsLoading,
	);

	const handleSortChange = (event) => setSortType(event.target.value);

	return (
		<section
			id="accouts__operations-history-container"
			className="flex flex-col flex-6/12 p-4 rounded-3xl bg-sky-950/40 gap-4"
		>
			<div className="flex justify-between gap-2">
				<SectionContainerHeader title={'История операций'} />
				<SortSelector handleSortChange={handleSortChange} sortType={sortType} />
				<EditAddDeleteButton
					icon={EditIcon}
					title={'Изменить'}
					to={''}
					alt={'Изменить историю крипто операций'}
				/>
			</div>
			{fetchHistoryIsLoading ? (
				<div className="flex flex-col items-center justify-center min-w-[40vw] max-h-[44vh] gap-3 pr-1 pt-1">
					<Loader />
				</div>
			) : (
				<div
					id="operationsHistoryBoxWrapper"
					className="flex flex-col max-h-[42vh] gap-3 rounded-2xl pr-1 pt-1 overflow-y-auto overscroll-auto scroll-smooth scrollbar"
				>
					{sortedHistory.map((operation) => (
						<div key={operation._id}>
							<CryptoOperationHistory
								coin={operation.asset}
								symbol={findCoinSymbol(fetchedCoinsPrices, operation.assetId)}
								icon={findCoinIcon(fetchedCoinsPrices, operation.assetId)}
								price={operation.checkPrice}
								operationAmount={operation.amount}
								assetAmount={operation.assetAmount}
								operationType={operation.type}
								exchangedAsset={findAccountName(fetchedCoinsPrices, operation.exchangedAsset)}
								operationDate={operation.date}
							/>
						</div>
					))}
				</div>
			)}
		</section>
	);
};
