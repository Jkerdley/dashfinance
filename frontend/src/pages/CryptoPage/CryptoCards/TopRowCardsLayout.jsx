import React from 'react';
import { TopRowCard } from './TopRowCard';

export const TopRowCardsLayout = () => {
	return (
		<section id="layout__crypto-top__line" className="flex flex-[0.5] 2xl:flex-nowrap flex-wrap gap-4">
			<TopRowCard coinTitle={'Bitcoin'} flex={'flex-2'} />
			<TopRowCard coinTitle={'Etherium'} flex={'flex-2'} />
			<TopRowCard coinTitle={'BNB'} flex={'flex-2'} />
			<TopRowCard coinTitle={'Add'} flex={'flex-2'} onClick={null} isAddButton={true} disabled={true} />
			<TopRowCard coinTitle={'News'} flex={'flex-5'} />
		</section>
	);
};
