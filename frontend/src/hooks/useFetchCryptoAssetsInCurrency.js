import { useCurrency } from './useCurrency';
import { useGetCryptoAssetsQuery } from '../store/api/backendApi';
import { useGetCryptoCoinsQuery } from '../store/api/externalApi';
import { calculateValueInCurrency } from '../utils';
import { useMemo } from 'react';

export const useFetchCryptoAssetsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const { data: cryptoAssets = [], isLoading: isAssetsLoading } = useGetCryptoAssetsQuery();
	const { data: cryptoCoins = [], isLoading: isCoinsLoading } = useGetCryptoCoinsQuery();
	
	const isLoading = isAssetsLoading || isCoinsLoading;

	const cryptoAssetsInCurrency = useMemo(() => {
		return cryptoAssets.map((asset) => {
			const fetchedCoinData = cryptoCoins.find((coin) => coin.id === asset.coinId);

			const coinPrice = parseFloat(fetchedCoinData?.price || 0);
			const assetAmount = parseFloat(asset.assetAmount);
			const assetAveragePrice = parseFloat(asset.averagePrice);
			return {
				...asset,
				averagePrice: calculateValueInCurrency(asset.averagePrice, isUSD, rubleCourse),
				icon: fetchedCoinData?.icon,
				growValue: parseFloat(fetchedCoinData?.priceChange1d || 0),
				price: calculateValueInCurrency(fetchedCoinData?.price || 0, isUSD, rubleCourse),
				profit: calculateValueInCurrency(coinPrice * assetAmount, isUSD, rubleCourse),
				profitPercentage: ((coinPrice - assetAveragePrice) / assetAveragePrice) * 100,
			};
		});
	}, [cryptoAssets, cryptoCoins, isUSD, rubleCourse]);

	return { cryptoAssetsInCurrency, cryptoCoins, isLoading };
};
