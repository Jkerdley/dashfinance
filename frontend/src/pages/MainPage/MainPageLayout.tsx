import { FinanceAddAndSpendChartContainer } from '../FinancesPage/Charts/index';
import { FinanceResultLayout } from '../FinancesPage/FinanceResult/index';
import { TopRowCardsLayout } from '../CryptoPage/CryptoCards/TopRowCardsLayout';
import { useGetAccountsQuery, useGetCategoriesQuery } from '../../store/api/backendApi';
import { CryptoResultLayout } from '../CryptoPage/CryptoResult/index';
import { useFetchCryptoAssetsInCurrency } from '../../hooks/index';
import { GainerAndLooserLayout } from '../CryptoPage/Charts/index';
import { Loader } from '../../components/Loaders/Loader';
import { OperationsFinanceHistoryLayout } from '../FinancesPage/OperationHistory/OperationsFinanceHistoryLayout';

export const MainPageLayout = () => {
    const { isLoading: accountsLoading } = useGetAccountsQuery();
    const { isLoading: categoriesLoading } = useGetCategoriesQuery();
    const {
        cryptoAssetsInCurrency,
        cryptoCoins,
        isLoading: cryptoLoading,
    } = useFetchCryptoAssetsInCurrency();

    if (accountsLoading || categoriesLoading || cryptoLoading) {
        return <Loader />;
    }

    return (
        <main className="flex flex-col gap-4 w-full">
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
                        <OperationsFinanceHistoryLayout  />
                    </div>
                </div>
                <div className="flex flex-wrap flex-5/12 flex-row 2xl:flex-col gap-4">
                    <FinanceAddAndSpendChartContainer />
                </div>

                <GainerAndLooserLayout cryptoAssetsInCurrency={cryptoAssetsInCurrency} />
            </section>
        </main>
    );
};
