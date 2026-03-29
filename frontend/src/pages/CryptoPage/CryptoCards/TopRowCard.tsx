import { calculateValueInCurrency } from '../../../utils';
import { useCurrency } from '../../../hooks';
import { CardIcon } from '../../../components/CardIcon';

interface AssetData {
    price: string | number;
    icon?: string | null;
    symbol: string;
    priceChange1h: string | number;
    priceChange1w: string | number;
    priceChange1d: string | number;
    [key: string]: any;
}

interface TopRowCardProps {
    assetData?: AssetData;
    flex?: string;
    isAddButton?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export const TopRowCard = ({ assetData, flex = '', isAddButton, disabled, onClick }: TopRowCardProps) => {
    const { isUSD, rubleCourse } = useCurrency();

    const priceInCurrency = assetData
        ? calculateValueInCurrency(Number(assetData.price) || 0, isUSD, rubleCourse || 1)
        : 0;

    const isDisabled = disabled ? '' : 'cursor-pointer';

    if (isAddButton) {
        return (
            <button onClick={onClick} className={`group flex flex-1/12 w-auto rounded-3xl ${isDisabled}`}>
                <div
                    className={`flex py-2 px-4 ${flex} bg-sky-700/20 h-auto min-h-26 items-center justify-center rounded-3xl`}
                >
                    <span
                        className={`flex mb-1 duration-150 ease-in-out transition-all text-5xl font-bold ${disabled ? 'text-gray-100/20' : 'text-gray-100/70 group-hover:scale-110'}`}
                    >
                        &#43;
                    </span>
                </div>
            </button>
        );
    }

    if (!assetData) return null;

    const change1h = parseFloat(String(assetData.priceChange1h)) || 0;
    const change1w = parseFloat(String(assetData.priceChange1w)) || 0;
    const change1d = parseFloat(String(assetData.priceChange1d)) || 0;

    return (
        <section className={`flex flex-col py-3 px-3 ${flex} bg-sky-950/40 min-h-20 rounded-3xl`}>
            <div className="flex flex-col gap-2 items-start">
                <section className="flex gap-4 items-center justify-between w-full">
                    <div className="flex gap-3 items-center justify-start text-lg font-medium truncate">
                        <CardIcon icon={assetData.icon || undefined} />
                        <span className="text-lg font-medium truncate">{assetData.symbol}</span>
                        <span
                            className={`text-lg font-medium truncate ${change1h < 0 ? 'text-main-red' : 'text-main-green'}`}
                        >
                            {priceInCurrency}
                        </span>
                    </div>
                    <div
                        className={`flex items-center gap-1 text-lg font-medium truncate ${change1h < 0 ? 'text-main-red' : 'text-main-green'}`}
                    >
                        <span
                            className={`flex h-2 w-2 truncate ${change1h < 0 ? 'triangle-down' : 'triangle-up'}`}
                        ></span>
                        {assetData.priceChange1h} %
                    </div>
                </section>

                <section className="flex pl-1 gap-4 items-center justify-between w-full">
                    <div className="flex gap-2 items-center justify-between w-full">
                        <div
                            className={`flex items-center gap-1 truncate ${change1w < 0 ? 'text-main-red' : 'text-main-green'}`}
                        >
                            <span className="truncate text-white/70">Неделя:</span>
                            {assetData.priceChange1w} %
                            <span
                                className={`sm:flex hidden h-2 w-2 truncate ${change1w < 0 ? 'triangle-down' : 'triangle-up'}`}
                            ></span>
                        </div>

                        <div
                            className={`flex items-center gap-1 truncate ${change1d < 0 ? 'text-main-red' : 'text-main-green'}`}
                        >
                            <span className="truncate text-white/70">День:</span>
                            {assetData.priceChange1d} %
                            <span
                                className={`sm:flex hidden h-2 w-2 truncate ${change1d < 0 ? 'triangle-down' : 'triangle-up'}`}
                            ></span>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
};
