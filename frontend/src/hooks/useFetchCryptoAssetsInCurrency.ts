import { useMemo } from 'react';
import { useCurrency } from './useCurrency';
import { useGetCryptoAssetsQuery } from '../store/api/backendApi';
import { useGetCryptoCoinsQuery } from '../store/api/externalApi';
import { calculateValueInCurrency } from '../utils/calculateValueInCurrency';
import type { CryptoAsset } from '../types/models';
import type { ExternalCryptoCoin } from '../store/api/externalApi';

export interface FormattedCryptoAsset extends Omit<CryptoAsset, 'averagePrice'> {
	averagePrice: string;
	icon?: string;
	growValue: number;
	price: string;
	profit: string;
	profitPercentage: number;
}

interface UseFetchCryptoReturn {
	cryptoAssetsInCurrency: FormattedCryptoAsset[];
	cryptoCoins: ExternalCryptoCoin[];
	isLoading: boolean;
}

export const useFetchCryptoAssetsInCurrency = (): UseFetchCryptoReturn => {
	const { isUSD, rubleCourse } = useCurrency();
	const { data: cryptoAssets = [], isLoading: isAssetsLoading } = useGetCryptoAssetsQuery();
	const { data: cryptoCoins = [], isLoading: isCoinsLoading } = useGetCryptoCoinsQuery();

	const isLoading = isAssetsLoading || isCoinsLoading;

	const cryptoAssetsInCurrency = useMemo(() => {
		const currentCourse = rubleCourse || 1;

		return cryptoAssets.map((asset) => {
			const fetchedCoinData = cryptoCoins.find((coin) => coin.id === asset.coinId);

			const coinPrice = parseFloat((fetchedCoinData?.price || 0).toString());
			const assetAmount = parseFloat(asset.assetAmount.toString());
			const assetAveragePrice = parseFloat(asset.averagePrice.toString());

			const totalValue = coinPrice * assetAmount;
			const profitValue = totalValue - assetAveragePrice * assetAmount;

			const profitPercentage =
				assetAveragePrice > 0 ? ((coinPrice - assetAveragePrice) / assetAveragePrice) * 100 : 0;

			return {
				...asset,
				averagePrice: calculateValueInCurrency(assetAveragePrice, isUSD, currentCourse),
				icon: fetchedCoinData?.icon,
				growValue: parseFloat((fetchedCoinData?.priceChange1d || 0).toString()),
				price: calculateValueInCurrency(coinPrice, isUSD, currentCourse),
				profit: calculateValueInCurrency(profitValue, isUSD, currentCourse),
				profitPercentage,
			};
		});
	}, [cryptoAssets, cryptoCoins, isUSD, rubleCourse]);

	return { cryptoAssetsInCurrency, cryptoCoins, isLoading };
};
