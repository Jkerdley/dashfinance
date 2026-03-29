import { useState, useMemo, ChangeEvent } from 'react';
import { List, RowComponentProps } from 'react-window';
import { FinanceOperationHistory } from './FinanceOperationHistory';
import { SortSelector } from '../../../components/SortSelector/SortSelector';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { Loader } from '../../../components/Loaders/Loader';
import { useGetHistoryQuery } from '../../../store/api/backendApi';
import { useCurrency } from '../../../hooks';
import { getHIstoryInCurrency } from '../../../utils/getHIstoryInCurrency';
import { getsortedHistory } from '../../../utils/getSortedHistory';
import { SORT_TYPES, VIRTUAL_LIST_CONFIG } from '../../../constants/operations';
import type { SortTypesValue } from '../../../constants/operations';

interface FormattedHistoryItem {
    id: string;
    type: 'add' | 'spend';
    category: string;
    comment: string;
    amount: string;
    account: string;
    date: string;
    [key: string]: any;
}

interface RowData {
    items: FormattedHistoryItem[];
}

const HistoryRow = (props: RowComponentProps<RowData>) => {
    const { index, style, items } = props;
    const operation = items[index];

    if (!operation) return null;

    return (
        <div style={style}>
            <FinanceOperationHistory
                id={operation.id}
                operationType={operation.type}
                category={operation.category}
                operationComment={operation.comment}
                operationAmount={operation.amount}
                accountName={operation.account}
                operationDate={operation.date}
            />
        </div>
    );
};

export const OperationsFinanceHistoryLayout = () => {
    const [sortType, setSortType] = useState<SortTypesValue>(SORT_TYPES.NEWEST);
    const { isUSD, rubleCourse } = useCurrency();
    const { data: financeHistory = [], isLoading: fetchHistoryIsLoading } = useGetHistoryQuery();

    const sortedHistory = useMemo(() => {
        const filtered = getHIstoryInCurrency(financeHistory, isUSD, rubleCourse || 1) || [];
        return getsortedHistory(filtered, sortType) || [];
    }, [financeHistory, isUSD, rubleCourse, sortType]);

    const formattedHistory: FormattedHistoryItem[] = useMemo(() => {
        return sortedHistory.map((item: any) => ({
            ...item,
            category: item.category || 'Без категории',
            comment: item.comment || '',
            account: item.account || 'Счет удален',
            amount: String(item.amount || '0'),
        }));
    }, [sortedHistory]);

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSortType(event.target.value as SortTypesValue);
    };

    return (
        <section
            id="accouts__operations-history-container"
            className="flex flex-col flex-7/12 p-4 lg:h-full rounded-3xl bg-sky-950/40 gap-4"
        >
            <div className="flex flex-wrap sm:flex-nowrap justify-between gap-2">
                <SectionContainerHeader title="История операций" />
                <SortSelector handleSortChange={handleSortChange} sortType={sortType} />
            </div>

            {fetchHistoryIsLoading ? (
                <div className="flex flex-1 items-center justify-center">
                    <Loader />
                </div>
            ) : formattedHistory.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-slate-400">
                    Операции отсутствуют
                </div>
            ) : (
                <div
                    id="operationsHistoryBoxWrapper"
                    className="flex flex-col max-h-[44vh] gap-3 rounded-2xl pr-1 pt-1 overflow-hidden"
                >
                    <List
                        className="scrollbar overflow-x-hidden"
                        style={{
                            height: VIRTUAL_LIST_CONFIG.LIST_HEIGHT,
                            width: '100%',
                        }}
                        rowCount={formattedHistory.length}
                        rowHeight={VIRTUAL_LIST_CONFIG.ROW_HEIGHT}
                        rowProps={{ items: formattedHistory }}
                        rowComponent={HistoryRow}
                    />
                </div>
            )}
        </section>
    );
};
