import React from 'react';
import { CryptoResult } from './CryptoResult';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { RefreshCourseButton } from '../../../components/buttons';

export const CryptoResultLayout = ({ cryptoAssetsInCurrency, isLoading }) => {
	return (
		<section
			id="col__finance-result-container"
			className="flex flex-col flex-6/12 min-h-[30vh] gap-2 p-4 rounded-3xl bg-sky-950/40"
		>
			<div id="finance-result__and__course-button" className="flex justify-between gap-2">
				<SectionContainerHeader title={'Крипто портфолио'} />
				<RefreshCourseButton title={'Обновить курс Криптовалют'} isCrypto={true} />
			</div>
			<CryptoResult cryptoAssetsInCurrency={cryptoAssetsInCurrency} isLoading={isLoading} />
		</section>
	);
};
