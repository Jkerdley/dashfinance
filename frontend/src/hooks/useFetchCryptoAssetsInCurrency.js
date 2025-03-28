import { useDispatch, useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';
import { selectCryptoAssets, selectCryptoIsLoading, selectCryptoCoins } from '../store/selectors';
import { calculateValueInCurrency } from '../utils';
import { useEffect, useMemo } from 'react';
import { fetchCryptoData } from '../store/actions/async';

export const useFetchCryptoAssetsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const isLoading = useSelector(selectCryptoIsLoading);
	const cryptoAssets = useSelector(selectCryptoAssets);
	const cryptoCoins = useSelector(selectCryptoCoins);
	const dispatch = useDispatch();

	useEffect(() => {
		cryptoAssets.length === 0 && cryptoCoins.length === 0 && dispatch(fetchCryptoData());
	}, []);

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
