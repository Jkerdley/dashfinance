import { CardIcon } from '../../../components/CardIcon';
import { OptionsButton } from '../../../components/buttons';
import { openModal } from '../../../store/slices/modalSlice';
import { MODAL_TYPES } from '../../../constants/modals';
import { useAppDispatch } from '../../../hooks/reduxHooks';

export interface CryptoAssetItem {
    id: string;
    name: string;
    price: string | number;
    profit: string | number;
    profitPercentage: number;
    assetAmount: number;
    averagePrice: string | number;
    icon?: string;
    symbol: string;
    growValue: string | number;
    [key: string]: any;
}

interface CryptoAssetsProps {
    id: string;
    coinTitle: string;
    coinPrice: string | number;
    profit: string | number;
    profitPercentage: number;
    assetsAmount: number;
    averageBuyPrice: string | number;
    icon?: string;
    symbol: string;
    growValue: string | number;
    inAssetCard?: boolean;
    cryptoAssetsInCurrency?: CryptoAssetItem[];
}

export const CryptoAssets = (props: CryptoAssetsProps) => {
    const {
        id,
        coinTitle,
        coinPrice,
        profit,
        profitPercentage,
        assetsAmount,
        averageBuyPrice,
        icon,
        symbol,
        growValue,
        inAssetCard = false,
        cryptoAssetsInCurrency,
    } = props;

    const dispatch = useAppDispatch();

    const cleanPrice = (val: string | number): number => {
        if (typeof val === 'number') return val;
        return parseFloat(val.replace(/[^\d.-]/g, '')) || 0;
    };

    const trimmedCoinPrice = cleanPrice(coinPrice);
    const trimmedAverageBuyPrice = cleanPrice(averageBuyPrice);

    const isPriceGrowing = assetsAmount === 0 || Number(growValue) >= 0;
    const priceColorClass = isPriceGrowing ? 'text-main-green' : 'text-main-red';

    const isProfitable = assetsAmount === 0 || trimmedCoinPrice >= trimmedAverageBuyPrice;
    const profitColorClass = isProfitable ? 'text-main-green' : 'text-main-red';

    const formattedAmount = coinTitle === 'Bitcoin' ? assetsAmount?.toFixed(6) : assetsAmount?.toFixed(4);

    const handleOptionsClick = () => {
        dispatch(
            openModal({
                modalType: MODAL_TYPES.UPDATE_CRYPTO_ASSET,
                modalProps: {
                    assetId: id,
                    cryptoAssetsInCurrency,
                },
            }),
        );
    };

    return (
        <div className="flex items-center justify-between p-2 rounded-2xl h-14 bg-sky-300/20 w-full">
            <div className="flex flex-6 items-center justify-between md:min-w-90 w-auto">
                <CardIcon size={6} padding="p-2" buttonSize={11} icon={icon} />

                <div className="flex flex-col mx-2 w-full truncate">
                    <div className="flex text-base items-between justify-between truncate overflow-hidden">
                        <div
                            className={`flex gap-2 justify-center items-center truncate ${profitColorClass}`}
                        >
                            <span className="truncate font-medium">{coinTitle}</span>
                            {assetsAmount > 0 && (
                                <div className="md:flex hidden items-center gap-1">
                                    <div
                                        className={`h-2 w-2 ${profitPercentage < 0 ? 'triangle-down' : 'triangle-up'}`}
                                    />
                                    <span className="text-xs opacity-80">{profitPercentage.toFixed(2)}%</span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 truncate font-medium">{profit}</div>
                    </div>

                    <div className="flex justify-between gap-2">
                        <div className="flex gap-2">
                            <span className={`text-sm font-semibold ${priceColorClass}`}>{coinPrice}</span>
                            <span className={`sm:flex hidden text-xs items-center ${priceColorClass}`}>
                                {growValue}% (1d)
                            </span>
                        </div>
                        <span className="text-sm truncate text-gray-400">
                            {formattedAmount} {symbol}
                        </span>
                    </div>
                </div>
            </div>

            {!inAssetCard && <OptionsButton onClick={handleOptionsClick} flex="flex-[0.25]" />}
        </div>
    );
};
