import { CurrencyToggle } from '../../buttons';
import { useCurrency } from '../../../hooks';
import { CryptoAssets } from '../../../pages/CryptoPage/CryptoPortfolioList';
import { CryptoOperationHistory } from '../../../pages/CryptoPage/CryptoOperationHistory';
import { calculateValueInCurrency } from '../../../utils';

interface HistoryItem {
    _id: string;
    asset: string;
    checkPrice: number | string;
    checkSumm: number | string;
    assetAmount: number | string;
    type: string;
    exchangedAsset?: string;
    date: string;
}

interface SelectedAsset {
    id: string;
    coinId: string;
    averagePrice: number | string;
    assetAmount: number | string;
    price: number | string;
    profit: number | string;
    profitPercentage: number | string;
    growValue: string | number;
    name: string;
    icon: string;
    symbol: string;
    history: HistoryItem[];
    [key: string]: any;
}

interface CryptoAssetUpdateProps {
    selectedAsset: SelectedAsset;
    error?: string;
    onClose: () => void;
}

const parseToNumber = (value?: string | number): number => {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return value;
    return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
};

export const CryptoAssetUpdate = ({ selectedAsset, error }: CryptoAssetUpdateProps) => {
    const { isUSD, rubleCourse } = useCurrency();
    const safeRubleCourse = rubleCourse || 1;

    return (
        <section className="flex flex-col items-center justify-evenly gap-6 min-h-[25vh] w-full">
            <h2 className="text-2xl">Обновить криптоактив</h2>
            <CurrencyToggle />
            {error && <div className="mb-4 text-main-red">{error}</div>}

            <div className="mt-2 min-w-2/3 md:min-w-1/2 mb-2 items-center">
                <CryptoAssets
                    id={selectedAsset.id}
                    averageBuyPrice={selectedAsset.averagePrice as any}
                    assetsAmount={selectedAsset.assetAmount as any}
                    coinPrice={selectedAsset.price as any}
                    profit={selectedAsset.profit as any}
                    profitPercentage={selectedAsset.profitPercentage as any}
                    growValue={selectedAsset.growValue as any}
                    coinTitle={selectedAsset.name}
                    icon={selectedAsset.icon}
                    symbol={selectedAsset.symbol}
                    inAssetCard={true}
                />
            </div>

            <div className="flex flex-col w-full bg-sky-950/90 max-h-50 overflow-y-auto rounded-lg scrollbar">
                {selectedAsset.history.map((coin) => (
                    <div
                        key={coin._id}
                        className="flex p-2 hover:bg-sky-800/60 cursor-pointer overflow-hidden"
                    >
                        <CryptoOperationHistory
                            id={coin._id}
                            coinId={selectedAsset.coinId}
                            coin={coin.asset}
                            symbol={selectedAsset.symbol}
                            icon={selectedAsset.icon}
                            price={coin.checkPrice as any}
                            operationAmount={calculateValueInCurrency(parseToNumber(coin.checkSumm), isUSD, safeRubleCourse)}
                            assetAmount={coin.assetAmount as any}
                            operationType={coin.type}
                            exchangedAsset={coin.exchangedAsset}
                            operationDate={coin.date}
                            inModal={true}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};
