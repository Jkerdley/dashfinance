import React from 'react';
import { TopRowCard } from './TopRowCard';
import { fetchedCoinsPrices } from '../../../db.js';

export const TopRowCardsLayout = ({ cryptoAssetsInCurrency, isLoading }) => {
	const coinDataInCards = fetchedCoinsPrices;

	return (
		<section
			id="layout__crypto-top__line"
			className="flex flex-4/12 max-h-50 xl:flex-nowrap flex-wrap gap-2"
		>
			{isLoading ? (
				<div>Загрузка...</div> // Или ваш компонент загрузки
			) : (
				<>
					<TopRowCard coinTitle={'Bitcoin'} data={coinDataInCards.result[0]} flex={'flex-2/12'} />
					<TopRowCard coinTitle={'Etherium'} data={coinDataInCards.result[1]} flex={'flex-2/12'} />
					<TopRowCard coinTitle={'BNB'} data={coinDataInCards.result[2]} flex={'flex-2/12'} />
					<TopRowCard coinTitle={'News'} flex={'flex-6/12'} />
				</>
			)}
		</section>
	);
};
