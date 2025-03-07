import { useDispatch, useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';
import { selectCryptoAssets, selectCryptoIsLoading, selectCryptoCoins } from '../store/selectors';
import { calculateValueInCurrency } from '../utils';
import { useEffect } from 'react';
import { fetchCryptoData } from '../store/actions/async';

export const useFetchCryptoAssetsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const isLoading = useSelector(selectCryptoIsLoading);
	const cryptoAssets = useSelector(selectCryptoAssets);
	const cryptoCoins = useSelector(selectCryptoCoins);
	const dispatch = useDispatch();

	useEffect(() => {
		cryptoAssets.length === 0 && cryptoCoins.length === 0 && dispatch(fetchCryptoData());
	}, [dispatch]);

	const cryptoAssetsInCurrency = cryptoAssets.map((asset) => {
		const fetchedCoinData = cryptoCoins.find((coin) => coin.id === asset.coinId);

		return {
			...asset,
			averagePrice: calculateValueInCurrency(asset.averagePrice, isUSD, rubleCourse),
			icon: fetchedCoinData.icon,
			growValue: parseFloat(fetchedCoinData.priceChange1d),
			price: calculateValueInCurrency(fetchedCoinData.price, isUSD, rubleCourse),
			profit: calculateValueInCurrency(
				parseFloat(parseFloat(fetchedCoinData.price) * parseFloat(asset.assetAmount)),
				isUSD,
				rubleCourse,
			),
			profitPercentage:
				parseFloat(
					(parseFloat(fetchedCoinData.price) - parseFloat(asset.averagePrice)) /
						parseFloat(asset.averagePrice),
				) * 100,
		};
	});

	return { cryptoAssetsInCurrency, isLoading };
};
