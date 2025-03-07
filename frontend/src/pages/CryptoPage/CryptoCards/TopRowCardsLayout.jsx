import React from 'react';
import { TopRowCard } from './TopRowCard';

export const TopRowCardsLayout = ({ cryptoAssetsInCurrency, isLoading }) => {
	return (
		<section
			id="layout__crypto-top__line"
			className="flex flex-4/12 max-h-50 xl:flex-nowrap flex-wrap gap-2"
		>
			<TopRowCard coinTitle={'Bitcoin'} data={cryptoAssetsInCurrency[0]} flex={'flex-2/12'} />
			<TopRowCard coinTitle={'Etherium'} data={cryptoAssetsInCurrency[1]} flex={'flex-2/12'} />
			<TopRowCard coinTitle={'BNB'} data={cryptoAssetsInCurrency[2]} flex={'flex-2/12'} />
			<TopRowCard coinTitle={'News'} flex={'flex-6/12'} />
		</section>
	);
};
