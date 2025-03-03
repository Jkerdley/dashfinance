import React from 'react';
import { TopRowCard } from './TopRowCard';
import { fetchedCoinsPrices } from '../../../db.js';
import { useFetchCryptoAssetsInCurrency } from '../../../hooks/useFetchCryptoAssetsInCurrency.js';

export const TopRowCardsLayout = () => {
	const { cryptoAssetsInCurrency, isLoading } = useFetchCryptoAssetsInCurrency();
	const coinDataInCards = fetchedCoinsPrices;
	console.log('fetchedCoinData', fetchedCoinsPrices.result);

	return (
		<section id="layout__crypto-top__line" className="flex flex-1/12 2xl:flex-nowrap flex-wrap gap-4">
			<TopRowCard coinTitle={'Bitcoin'} data={coinDataInCards.result[0]} flex={'flex-2/12'} />
			<TopRowCard coinTitle={'Etherium'} data={coinDataInCards.result[1]} flex={'flex-2/12'} />
			<TopRowCard coinTitle={'BNB'} data={coinDataInCards.result[2]} flex={'flex-2/12'} />
			{/* <TopRowCard
				coinTitle={'Add'}
				flex={'flex-2/12'}
				onClick={null}
				isAddButton={true}
				disabled={true}
			/> */}
			<TopRowCard coinTitle={'News'} flex={'flex-6/12'} />
		</section>
	);
};
