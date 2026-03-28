import { TopRowCard } from './TopRowCard';

export interface CryptoCoinItem {
    id: string;
    symbol: string;
    name?: string;
    icon?: string;
    price?: number | string;
    priceChange1h?: number | string;
    priceChange1d?: number | string;
    priceChange1w?: number | string;
    [key: string]: any;
}

interface TopRowCardsLayoutProps {
    cryptoCoins: CryptoCoinItem[] | CryptoCoinItem[][];
}

export const TopRowCardsLayout = ({ cryptoCoins }: TopRowCardsLayoutProps) => {
    if (!cryptoCoins || cryptoCoins.length === 0) return null;

    const flatCoins: CryptoCoinItem[] = Array.isArray(cryptoCoins[0])
        ? (cryptoCoins as CryptoCoinItem[][]).flat()
        : (cryptoCoins as CryptoCoinItem[]);

    const filteredCoins = flatCoins
        .filter((asset) => asset && asset.symbol && asset.symbol !== 'USDT')
        .slice(0, 5);

    return (
        <section id="layout__crypto-top__line" className="flex flex-1/12 2xl:flex-nowrap flex-wrap gap-4">
            {filteredCoins.map((asset) => (
                <TopRowCard key={asset.id} assetData={asset as any} flex="flex-3/12" />
            ))}
        </section>
    );
};
