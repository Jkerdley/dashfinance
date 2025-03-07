import { useSelector } from 'react-redux';
import { useCurrency } from './useCurrency';

import { selectCryptoAssets, selectCryptoAssetsIsLoading } from '../store/selectors';
import { calculateValueInCurrency } from '../utils';

import { fetchedCoinsPrices } from '../db';
import { selectCryptoCoins, selectCryptoCoinsIsLoading } from '../store/selectors/select-crypto-coins';

export const useFetchCryptoAssetsInCurrency = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const isLoading = useSelector(selectCryptoAssetsIsLoading);
	const cryptoAssets = useSelector(selectCryptoAssets);
	const cryptoCoins = useSelector(selectCryptoCoins);

	console.log('cryptoCoins', cryptoCoins);
	console.log('fetchedCoinsPrices.result DB', fetchedCoinsPrices.result);

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
