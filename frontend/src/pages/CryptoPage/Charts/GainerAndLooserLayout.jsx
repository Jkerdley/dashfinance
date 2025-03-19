import React, { memo } from 'react';
import { TopGainerAndLooserChart } from './TopGainerAndLooserChart';

export const GainerAndLooserLayout = memo(({ cryptoAssetsInCurrency }) => {
	return (
		<section className="flex 2xl:flex-col flex-row flex-2/12 gap-4">
			<TopGainerAndLooserChart data={cryptoAssetsInCurrency} title={'Топ роста (1d)'} type={'gainer'} />
			<TopGainerAndLooserChart data={cryptoAssetsInCurrency} title={'Топ лузер (1d)'} type={'looser'} />
		</section>
	);
});
GainerAndLooserLayout.displayName = 'GainerAndLooserLayout';
