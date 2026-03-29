import { useState } from 'react';
import { RefreshCourseButton } from '../../../components/buttons';
import { FinanceResult } from './FinanceResult';
import { RadialChartSelector } from '../../../components/SortSelector/RadialChartSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { SORT_TYPES } from '../../../constants/operations';
import type { SortTypesValue } from '../../../constants/operations';

interface FinanceResultLayoutProps {
    isMainPage?: boolean;
}

export const FinanceResultLayout = (props: FinanceResultLayoutProps) => {
    const { isMainPage = false } = props;

    const [selectedRadialSortType, setSelectedRadialSortType] = useState<SortTypesValue>(SORT_TYPES.MONTH);

    const handleRadialSortChange = () => {
        setSelectedRadialSortType((prev) =>
            prev === SORT_TYPES.MONTH ? SORT_TYPES.THIS_YEAR : SORT_TYPES.MONTH
        );
    };

    return (
        <div
            id="col__finance-result-container"
            className="flex flex-col flex-6/12 gap-2 p-4 rounded-3xl bg-sky-950/40 transition-all"
        >
            <div
                id="finance-result__and__course-button"
                className="flex md:flex-nowrap flex-wrap justify-between gap-2"
            >
                <SectionContainerHeader title={'Финансовый результат'} />
                {!isMainPage && <RefreshCourseButton title={'Обновить курс USD'} />}

                <RadialChartSelector
                    handleRadialSortChange={handleRadialSortChange}
                    selectedSortType={selectedRadialSortType}
                />
            </div>
            <FinanceResult selectedSortType={selectedRadialSortType} />
        </div>
    );
};
