import React, { useEffect } from 'react';
import { FinanceAddAndSpendChartContainer } from '../FinancesPage/Charts';
import { FinanceResultLayout } from '../FinancesPage/FinanceResult';
import { OpreationsFinanceHistoryLayout } from '../FinancesPage/OperationHistory';
import { TopRowCardsLayout } from '../CryptoPage/CryptoCards/TopRowCardsLayout';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectCategories, selectCryptoCoins } from '../../store/selectors';
import { CryptoResultLayout } from '../CryptoPage/CryptoResult';
import { useFetchCryptoAssetsInCurrency } from '../../hooks';
import { GainerAndLooserLayout } from '../CryptoPage/Charts';
import { fetchAccounts, fetchCategories } from '../../store/actions/async';
import { Loader } from '../../components/Loaders/Loader';

export const MainPageLayout = () => {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

	useEffect(() => {
		accounts.length === 0 && dispatch(fetchAccounts());
		categories.length === 0 && dispatch(fetchCategories());
	}, []);
	const cryptoCoins = useSelector(selectCryptoCoins);
	const { cryptoAssetsInCurrency, isLoading } = useFetchCryptoAssetsInCurrency();

	if (isLoading) {
		return <Loader />;
	}

	return (
		<section className="flex flex-col gap-4 w-full">
			<TopRowCardsLayout cryptoCoins={cryptoCoins} />
			<div className="flex 3xl:flex-nowrap flex-wrap gap-4">
				<FinanceResultLayout isMainPage={true} />
				<CryptoResultLayout cryptoAssetsInCurrency={cryptoAssetsInCurrency} isMainPage={true} />
			</div>
			<section
				id="layout__finances"
				className="flex 2xl:flex-nowrap flex-wrap rounded-4xl gap-4 h-full"
			>
				<div className="flex flex-6/12 flex-col gap-4">
					<div id="row__accounts-and-history" className="flex flex-10 gap-4">
						<OpreationsFinanceHistoryLayout inMainPage={true} />
					</div>
				</div>
				<div className="flex flex-wrap flex-5/12 flex-row 2xl:flex-col gap-4">
					<FinanceAddAndSpendChartContainer />
				</div>
				<GainerAndLooserLayout cryptoAssetsInCurrency={cryptoAssetsInCurrency} />
			</section>
		</section>
	);
};
