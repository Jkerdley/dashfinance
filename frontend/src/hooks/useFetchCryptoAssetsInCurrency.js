import { useDispatch, useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';
import { selectCryptoAssets, selectCryptoAssetsIsLoading } from '../store/selectors';
import { calculateValueInCurrency } from '../utils';
import { selectCryptoCoins } from '../store/selectors/select-crypto-coins';
import { useEffect } from 'react';
import { fetchCoinsPrices } from '../store/actions/async/fetchCoinsPrices';
import { fetchCryptoAssets } from '../store/actions/async';

export const useFetchCryptoAssetsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const isLoading = useSelector(selectCryptoAssetsIsLoading);
	const cryptoAssets = useSelector(selectCryptoAssets);
	const cryptoCoins = useSelector(selectCryptoCoins);
	const dispatch = useDispatch();

	useEffect(() => {
		if (cryptoCoins.length === 0) {
			dispatch(fetchCoinsPrices());
		}
	}, [cryptoCoins.length]);

	useEffect(() => {
		if (cryptoCoins.length > 0) {
			dispatch(fetchCryptoAssets());
		}
	}, [cryptoCoins.length, dispatch]);

	console.log('cryptoAssets', cryptoAssets);
	console.log('cryptoCoins', cryptoCoins);

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
