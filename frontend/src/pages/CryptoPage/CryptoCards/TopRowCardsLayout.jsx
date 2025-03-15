import React from 'react';
import { TopRowCard } from './TopRowCard';

export const TopRowCardsLayout = ({ cryptoCoins }) => {
	return (
		<section id="layout__crypto-top__line" className="flex flex-1/12 2xl:flex-nowrap flex-wrap gap-4">
			{cryptoCoins.slice(0, 5).map((asset) => {
				if (asset.symbol !== 'USDT') {
					return <TopRowCard key={asset.id} assetData={asset} flex={'flex-3/12'} />;
				}
			})}
		</section>
	);
};
