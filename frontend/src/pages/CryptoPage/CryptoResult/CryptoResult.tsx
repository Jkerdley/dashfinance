import { memo, useEffect, useMemo } from 'react';
import { useCurrency } from '../../../hooks';
import { CryptoAssetsAllocationChart } from '../Charts';
import { BestAndWorstPerformer } from './components/BestAndWorstPerformer';
import { CryptoTotalBalance } from './components/CryptoTotalBalance';
import { PNLpercentages } from './components/PNLpercentages';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { useGetCurrencyRatesQuery } from '../../../store/api/externalApi';
import { setUsdCourse } from '../../../store/slices/currencySlice';

interface CryptoAssetData {
    assetAmount: number;
    profitPercentage: number;
    profit: string | number;
    growValue: string | number;
    name: string;
    [key: string]: any;
}

interface CryptoResultProps {
    cryptoAssetsInCurrency: CryptoAssetData[];
}

export const CryptoResult = memo(({ cryptoAssetsInCurrency }: CryptoResultProps) => {
    const { isUSD, rubleCourse } = useCurrency();
    const dispatch = useAppDispatch();
    const { data: currencyData } = useGetCurrencyRatesQuery();

    const filterByZeroBalance = cryptoAssetsInCurrency.filter((coin) => coin.assetAmount > 0);
    const totalPNL = [...filterByZeroBalance].sort((a, b) => a.profitPercentage - b.profitPercentage);
    const indexOfLastItem = totalPNL.length > 0 ? totalPNL.length - 1 : 0;

    useEffect(() => {
        if (currencyData && !rubleCourse) {
            const course = currencyData.cbrf?.data?.[0]?.[3];
            if (course) {
                dispatch(setUsdCourse(Number(course)));
            }
        }
    }, [currencyData, rubleCourse, dispatch]);

    const cryptoAssetsBalance = useMemo(() => {
        return cryptoAssetsInCurrency.reduce((acc, asset) => {
            const profitValue = parseFloat(String(asset.profit).replace(/[^\d.-]/g, '')) || 0;
            return acc + profitValue;
        }, 0);
    }, [cryptoAssetsInCurrency]);

    const totalBalanceForDate = isUSD ? `$ ${cryptoAssetsBalance.toFixed(2)}` : `\u20bd ${cryptoAssetsBalance.toFixed(2)}`;

    return (
        <section id="finance-result__main-container" className="flex w-full h-full">
            <div className="flex flex-3 flex-col flex-wrap sm:gap-2 gap-2 items-center justify-around">
                <CryptoTotalBalance totalBalanceForDate={totalBalanceForDate} isUSD={isUSD} />
                <PNLpercentages totalPNL={totalPNL} />
                <BestAndWorstPerformer totalPNL={totalPNL} indexOfLastItem={indexOfLastItem} />
            </div>

            <div className="lg:flex hidden items-center justify-center flex-2">
                <CryptoAssetsAllocationChart cryptoAssetsInCurrency={cryptoAssetsInCurrency} />
            </div>
        </section>
    );
});
CryptoResult.displayName = 'CryptoResult';
