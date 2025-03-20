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
	console.log('cryptoCoins in hook', cryptoCoins);

	useEffect(() => {
		cryptoAssets.length === 0 && cryptoCoins.length === 0 && dispatch(fetchCryptoData());
	}, []);

	const cryptoAssetsInCurrency = useMemo(() => {
		return cryptoAssets.map((asset) => {
			const fetchedCoinData = cryptoCoins.find(
				(coin) => coin.id === asset.coinId || coin.name === asset.name,
			);

			return {
				...asset,
				averagePrice: calculateValueInCurrency(asset.averagePrice, isUSD, rubleCourse),
				icon: fetchedCoinData?.icon,
				growValue: parseFloat(fetchedCoinData?.priceChange1d || 0),
				price: calculateValueInCurrency(fetchedCoinData?.price || 0, isUSD, rubleCourse),
				profit: calculateValueInCurrency(
					parseFloat(parseFloat(fetchedCoinData?.price || 0) * parseFloat(asset.assetAmount)),
					isUSD,
					rubleCourse,
				),
				profitPercentage:
					parseFloat(
						(parseFloat(fetchedCoinData?.price || 0) - parseFloat(asset.averagePrice)) /
							parseFloat(asset.averagePrice),
					) * 100,
			};
		});
	}, [cryptoAssets, cryptoCoins, isUSD, rubleCourse]);

	return { cryptoAssetsInCurrency, cryptoCoins, isLoading };
};
