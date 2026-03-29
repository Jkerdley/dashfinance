import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { CardIcon } from '../../../components/CardIcon';

interface CryptoAssetData {
    symbol: string;
    name: string;
    growValue: number;
    icon?: string;
    profit: string | number;
    profitPercentage: string | number;
    [key: string]: any;
}

interface TopGainerAndLooserChartProps {
    data: CryptoAssetData[];
    title: string;
    type: 'gainer' | 'looser';
}

export const TopGainerAndLooserChart = ({ data, title, type }: TopGainerAndLooserChartProps) => {
    if (!data || data.length === 0) return null;

    const sortedData = [...data].sort((a, b) => a.growValue - b.growValue);

    const arrayWithoutStablecoins = sortedData.filter(
        (item) => item.symbol !== 'USDT' && item.symbol !== 'USDC' && item.symbol !== 'DAI',
    );

    if (arrayWithoutStablecoins.length === 0) return null;

    const indexOfLastItem = arrayWithoutStablecoins.length - 1;

    const targetAsset = type === 'looser'
        ? arrayWithoutStablecoins[0]
        : arrayWithoutStablecoins[indexOfLastItem];

    if (!targetAsset) return null;

    const growValue = targetAsset.growValue || 0;
    const parsedProfit = parseFloat(String(targetAsset.profit).replace(/[^\d.-]/g, '')) || 0;
    const parsedProfitPercentage = parseInt(String(targetAsset.profitPercentage)) || 0;

    return (
        <section id="column__income-chart" className="flex flex-2/12 p-4 rounded-3xl bg-sky-950/40">
            <section className="flex flex-col w-full gap-2">
                <div className="flex gap-2 items-center">
                    <SectionContainerHeader title={title} />
                    <span
                        className={`md:flex hidden truncate ${growValue < 0 ? 'text-main-red' : 'text-main-green'}`}
                    >
                        {growValue} %
                    </span>
                </div>

                <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
                    <div className="flex sm:flex-row flex-col gap-2 items-center">
                        <CardIcon buttonSize="12" size="8" icon={targetAsset.icon} />
                        <span className="text-md">{targetAsset.name}</span>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <div className="flex flex-col items-center">
                            <span className="text-md">Баланс: </span>
                            <span
                                className={`text-md ml-1 ${parsedProfit > 0 ? 'text-main-green' : 'text-main-red'}`}
                            >
                                {targetAsset.profit}
                            </span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-md text-center">Профит в процентах: </span>
                            <span
                                className={`text-md ml-1 ${parsedProfitPercentage > 0 ? 'text-main-green' : 'text-main-red'}`}
                            >
                                {parsedProfitPercentage} %
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};
