import { useState } from 'react';
import { aggregateChartDataByMonth, filteredByThisMonth, getsortedHistory } from '../../../utils';
import { useGetHistoryQuery } from '../../../store/api/backendApi';
import { ChartSelector } from '../../../components/SortSelector/ChartSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { FinanceChart } from '../../../components/Charts/FinanceChart';
import { useCurrency } from '../../../hooks';
import { SORT_TYPES } from '../../../constants/operations';
import type { SortTypesValue } from '../../../constants/operations';
import type { FinanceGraphData } from '../../../types/finance';

export const FinanceAddAndSpendChartContainer = () => {
    const [selectedSortType, setSelectedSortType] = useState<SortTypesValue>(SORT_TYPES.MONTH);
    const { isUSD, rubleCourse } = useCurrency();
    const { data: financeHistory = [] } = useGetHistoryQuery();

    const sortedHistory = getsortedHistory(
        filteredByThisMonth(financeHistory, selectedSortType),
        SORT_TYPES.OLDEST
    );

    const aggregatedData = aggregateChartDataByMonth(sortedHistory, selectedSortType);

    const mappedData: FinanceGraphData[] = aggregatedData.map((item: any) => {
        const course = rubleCourse || 1;

        const rawIncome = item.income ?? item.Доходы ?? 0;
        const rawExpenses = item.expenses ?? item.Расходы ?? 0;
        const rawBalance = item.balance ?? item.Баланс ?? 0;
        const date = item.date ?? item.name ?? '';

        return {
            date,
            income: isUSD ? (rawIncome / course).toFixed(2) : Number(rawIncome).toFixed(2),
            expenses: isUSD ? (rawExpenses / course).toFixed(2) : Number(rawExpenses).toFixed(2),
            balance: isUSD ? (rawBalance / course).toFixed(2) : Number(rawBalance).toFixed(2),
        };
    });

    const handleSortChange = () => {
        setSelectedSortType((prev) =>
            prev === SORT_TYPES.MONTH ? SORT_TYPES.ALL_TIME : SORT_TYPES.MONTH
        );
    };

    return (
        <div
            id="column__income-chart"
            className="flex flex-col flex-7 p-4 min-h-[45vh] rounded-3xl bg-sky-950/40"
        >
            <div className="flex gap-4 flex-wrap sm:flex-nowrap justify-between">
                <SectionContainerHeader title="График доходов и расходов" />
                <ChartSelector handleSortChange={handleSortChange} selectedSortType={selectedSortType} />
            </div>

            {mappedData.length === 0 ? (
                <span className="flex items-center justify-center mt-30 text-slate-400">
                    Нет расходов и доходов
                </span>
            ) : (
                <FinanceChart mappedData={mappedData} />
            )}
        </div>
    );
};
