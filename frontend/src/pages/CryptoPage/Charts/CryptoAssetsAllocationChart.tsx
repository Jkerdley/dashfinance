import { PieDiagramChart } from '../../../components/Charts/PieDiagramChart';

interface CryptoAssetData {
    name: string;
    profit: string | number;
    [key: string]: any;
}

interface CryptoAssetsAllocationChartProps {
    cryptoAssetsInCurrency: CryptoAssetData[];
}

export const CryptoAssetsAllocationChart = ({ cryptoAssetsInCurrency }: CryptoAssetsAllocationChartProps) => {
    const mappedData = cryptoAssetsInCurrency
        .map((asset) => {
            const rawValue = parseFloat(String(asset.profit).replace(/[^\d.-]/g, '')) || 0;
            return {
                name: asset.name,
                value: Math.abs(rawValue),
            };
        })
        .filter((asset) => asset.value > 0);

    const sortedData = mappedData.sort((a, b) => b.value - a.value);

    if (cryptoAssetsInCurrency.length === 0) {
        return <span>Добавьте активы чтобы увидеть график</span>;
    }

    return (
        <div className="relative">
            <span className="absolute top-3/4 left-1/2 transform -translate-x-1/2 text-sm text-gray-400">
                Аллокация
            </span>
            <PieDiagramChart mappedData={sortedData} isCrypto={true} />
        </div>
    );
};
