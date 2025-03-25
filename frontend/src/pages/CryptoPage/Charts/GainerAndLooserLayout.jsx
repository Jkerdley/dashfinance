import React, { memo } from 'react';
import { TopGainerAndLooserChart } from './TopGainerAndLooserChart';

export const GainerAndLooserLayout = memo(({ cryptoAssetsInCurrency }) => {
	const filteredByZeroBalance = cryptoAssetsInCurrency.filter((asset) => asset.assetAmount > 0);
	return (
		<section className="flex 2xl:flex-col flex-row flex-2/12 gap-4">
			<TopGainerAndLooserChart data={filteredByZeroBalance} title={'Топ роста (1d)'} type={'gainer'} />
			<TopGainerAndLooserChart data={filteredByZeroBalance} title={'Топ лузер (1d)'} type={'looser'} />
		</section>
	);
});
GainerAndLooserLayout.displayName = 'GainerAndLooserLayout';
