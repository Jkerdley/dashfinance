import React from 'react';
import { TopGainerAndLooserChart } from './TopGainerAndLooserChart';

export const GainerAndLooserLayout = ({ cryptoAssetsInCurrency, isLoading }) => {
	return (
		<section className="flex 2xl:flex-col flex-row flex-2/12 gap-4">
			<TopGainerAndLooserChart
				data={cryptoAssetsInCurrency}
				title={'Топ роста (1d)'}
				type={'gainer'}
				isLoading={isLoading}
			/>
			<TopGainerAndLooserChart
				data={cryptoAssetsInCurrency}
				title={'Топ лузер (1d)'}
				type={'looser'}
				isLoading={isLoading}
			/>
		</section>
	);
};
