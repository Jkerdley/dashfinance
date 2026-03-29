import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { CryptoOperationHistory } from './CryptoOperationHistory';
import { SortSelector } from '../../../components/SortSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { Loader } from '../../../components/Loaders/Loader';
import { useCurrency } from '../../../hooks/useCurrency';
import { getHIstoryInCurrency } from '../../../utils/getHIstoryInCurrency';
import { getsortedHistory } from '../../../utils/getSortedHistory';
import { useGetCryptoAssetsQuery } from '../../../store/api/backendApi';
import { useGetCryptoCoinsQuery } from '../../../store/api/externalApi';
import { SORT_TYPES } from '../../../constants/operations';

export const CryptoOpreationsHistoryContainer = () => {
    const [sortType, setSortType] = useState<string>(SORT_TYPES.NEWEST);
    const { isUSD, rubleCourse } = useCurrency();
    const { data: cryptoAssets = [], isLoading: assetsLoading } = useGetCryptoAssetsQuery();
    const { data: fetchedCoinsPrices = [], isLoading: coinsLoading } = useGetCryptoCoinsQuery();

    const fetchedHistory = useMemo(() => {
        return cryptoAssets.flatMap((asset: any) => asset.history || []);
    }, [cryptoAssets]);

    const fetchHistoryIsLoading = assetsLoading || coinsLoading;

    const filteredHistory = useMemo(() => {
        return getHIstoryInCurrency(fetchedHistory, isUSD, rubleCourse || 1);
    }, [isUSD, rubleCourse, fetchedHistory]);

    const sortedHistory = useMemo(() => {
        return getsortedHistory(filteredHistory, sortType);
    }, [filteredHistory, sortType]);

    const coinsLookup = useMemo(() => {
        const lookup = new Map();
        fetchedCoinsPrices.forEach((coin: any) => {
            lookup.set(coin.id, coin);
        });
        return lookup;
    }, [fetchedCoinsPrices]);

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => setSortType(event.target.value);

    return (
        <section
            id="accouts__operations-history-container"
            className="flex flex-col flex-6/12 p-4 rounded-3xl bg-sky-950/40 gap-4"
        >
            <div className="flex flex-wrap justify-between gap-2">
                <SectionContainerHeader title="История операций" />
                <SortSelector handleSortChange={handleSortChange} sortType={sortType} />
            </div>

            {fetchHistoryIsLoading ? (
                <div className="flex flex-col items-center justify-center min-w-[40vw] max-h-[44vh] gap-3 pr-1 pt-1">
                    <Loader />
                </div>
            ) : (
                <div
                    id="operationsHistoryBoxWrapper"
                    className="flex flex-col 3xl:max-h-[40vh] max-h-[35vh] gap-3 rounded-2xl pr-1 pt-1 overflow-y-auto overscroll-auto scroll-smooth scrollbar"
                >
                    {sortedHistory.map((operation: any) => {
                        const coinData = coinsLookup.get(operation.assetId);
                        const exchangedAssetData = coinsLookup.get(operation.exchangedAsset);
                        const exchangedAssetName = exchangedAssetData ? exchangedAssetData.symbol : 'Наличные';

                        return (
                            <div key={operation._id}>
                                <CryptoOperationHistory
                                    id={operation._id}
                                    coinId={operation.assetId}
                                    coin={operation.asset}
                                    symbol={coinData?.symbol || null}
                                    icon={coinData?.icon || null}
                                    price={operation.checkPrice}
                                    operationAmount={operation.amount}
                                    assetAmount={operation.assetAmount}
                                    operationType={operation.type}
                                    exchangedAsset={exchangedAssetName}
                                    operationDate={operation.date}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};
