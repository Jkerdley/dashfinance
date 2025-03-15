import React, { useMemo, useState } from 'react';
import { CryptoOperationHistory } from './CryptoOperationHistory.jsx';
import { SortSelector } from '../../../components/sortSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader.jsx';
import { findAccountName, findCoinIcon, findCoinSymbol } from '../../../utils/findCoinUtils.js';
import { Loader } from '../../../components/Loaders/Loader.jsx';
import { useSelector } from 'react-redux';
import { useCurrency } from '../../../hooks/useCurrency.js';
import { getHIstoryInCurrency } from '../../../utils/getHIstoryInCurrency.js';
import { getsortedHistory } from '../../../utils/getSortedHistory.js';
import {
	selectCryptoAssetsHistory,
	selectCryptoCoins,
	selectCryptoIsLoading,
} from '../../../store/selectors/select-crypto.js';

export const CryptoOpreationsHistoryContainer = () => {
	const [sortType, setSortType] = useState('newest');
	const { isUSD, rubleCourse } = useCurrency();
	const fetchedHistory = useSelector(selectCryptoAssetsHistory);
	const fetchHistoryIsLoading = useSelector(selectCryptoIsLoading);
	const fetchedCoinsPrices = useSelector(selectCryptoCoins);

	const filteredHistory = useMemo(() => {
		return getHIstoryInCurrency(fetchedHistory, isUSD, rubleCourse);
	}, [isUSD, rubleCourse, fetchedHistory]);

	const sortedHistory = useMemo(() => {
		return getsortedHistory(filteredHistory, sortType);
	}, [filteredHistory, sortType]);

	const handleSortChange = (event) => setSortType(event.target.value);

	return (
		<section
			id="accouts__operations-history-container"
			className="flex flex-col flex-6/12 p-4 rounded-3xl bg-sky-950/40 gap-4"
		>
			<div className="flex flex-wrap justify-between gap-2">
				<SectionContainerHeader title={'История операций'} />
				<SortSelector handleSortChange={handleSortChange} sortType={sortType} />
			</div>
			{fetchHistoryIsLoading ? (
				<div className="flex flex-col items-center justify-center min-w-[40vw] max-h-[44vh] gap-3 pr-1 pt-1">
					<Loader />
				</div>
			) : (
				<div
					id="operationsHistoryBoxWrapper"
					className="flex flex-col max-h-[35vh] gap-3 rounded-2xl pr-1 pt-1 overflow-y-auto overscroll-auto scroll-smooth scrollbar"
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
