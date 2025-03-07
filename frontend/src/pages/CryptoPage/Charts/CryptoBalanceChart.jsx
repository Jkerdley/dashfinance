import React from 'react';

import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { FinanceChart } from './../../FinancesPage/Charts';

export const CryptoBalanceChart = () => {
	return (
		<div id="column__income-chart" className="flex flex-col flex-4/12 p-4 rounded-3xl  bg-sky-950/40">
			<SectionContainerHeader title={'Баланс'} />
			<FinanceChart isCrypto={true} />
		</div>
	);
};
