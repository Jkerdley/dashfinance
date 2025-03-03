import { useDispatch, useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';
import { useEffect } from 'react';
import { selectCryptoAssets, selectCryptoAssetsIsLoading } from '../store/selectors';
import { calculateValueInCurrency } from '../utils';
import { fetchCryptoAssets } from '../store/actions/async/fetchCryptoAssets';
import { fetchedCoinsPrices } from '../db';

export const useFetchCryptoAssetsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const isLoading = useSelector(selectCryptoAssetsIsLoading);

	useEffect(() => {
		dispatch(fetchCryptoAssets());
	}, []);
	const cryptoAssets = useSelector(selectCryptoAssets);

	const cryptoAssetsInCurrency = cryptoAssets.map((asset) => {
		const fetchedCoinData = fetchedCoinsPrices.result.find((coin) => coin.id === asset.coinId);

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
