import { useDispatch, useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';
import { useEffect } from 'react';
import {
	selectCryptoAssets,
	selectCryptoAssetsHistory,
	selectCryptoAssetsIsLoading,
} from '../store/selectors';
import { calculateValueInCurrency } from '../utils';
import { fetchCryptoAssets } from '../store/actions/async/fetchCryptoAssets';
import { fetchedCoinsPrices } from '../db';

export const useFetchCryptoAssetsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const dispatch = useDispatch();
	const isLoading = useSelector(selectCryptoAssetsIsLoading);
	const cryptoHistory = useSelector(selectCryptoAssetsHistory);

	useEffect(() => {
		dispatch(fetchCryptoAssets());
	}, []);
	const cryptoAssets = useSelector(selectCryptoAssets);
	console.log('CryptoAssets in HOOK', cryptoAssets);

	const cryptoAssetsInCurrency = cryptoAssets.map((asset) => ({
		...asset,
		averagePrice: calculateValueInCurrency(asset.averagePrice, isUSD, rubleCourse),
	}));
	return { cryptoAssetsInCurrency, isLoading, cryptoHistory };
};

// const coinPricesInCurrency = fetchedCoinsPrices.result.map((coin) => ({
//     ...coin,
//     assetsBuyPriceAVG: calculateValueInCurrency(Number(coin.assetsBuyPriceAVG), isUSD, rubleCourse),
//     coinPrice: calculateValueInCurrency(Number(coin.price), isUSD, rubleCourse),
//     profit: calculateValueInCurrency(Number(coin.price * coin.assetsAmount), isUSD, rubleCourse),
// }));
