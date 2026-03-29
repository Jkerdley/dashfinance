import type { ChangeEvent } from 'react';
import { CardIcon } from '../../CardIcon';
import { getIconOfCategorie } from '../../../utils';

interface Account {
    name: string;
    icon: string;
}

interface Category {
    name: string;
}

interface FormState {
    selectedAccount?: Account | null;
    selectedCategory?: Category | null;
    incomeType?: string;
    operationSumm: string;
    operationDate: string;
}

interface FinalResultNewOperationItemProps {
    handleSummChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
    formState: FormState;
    isUSD: boolean;
    isAddOperation: boolean;
}

export const FinalResultNewOperationItem = ({
    handleSummChange,
    handleDateChange,
    formState,
    isUSD,
    isAddOperation,
}: FinalResultNewOperationItemProps) => {
    return (
        <section className="flex justify-between items-center min-h-28 w-full text-sm border-b-1 border-white/30 gap-2">
            <div className="flex flex-4/12 items-center truncate gap-2">
                <CardIcon
                    buttonSize={9}
                    padding="p-1"
                    size={5}
                    icon={getIconOfCategorie(formState.selectedAccount?.icon || '')}
                />
                {isAddOperation ? (
                    <span className="text-sm truncate"> {formState.incomeType}</span>
                ) : (
                    <span className="text-sm truncate"> {formState.selectedCategory?.name}</span>
                )}
            </div>

            {isUSD ? '$ ' : '\u20bd '}

            <div className="flex sm:flex-nowrap flex-wrap flex-6/12 gap-2">
                <input
                    name="operation-amount"
                    type="text"
                    className="text-sm h-[30px] w-full flex-5/12 min-w-20 rounded-lg px-2 border-[1px] border-sky-100/60"
                    placeholder="Введите сумму"
                    value={formState.operationSumm}
                    onChange={handleSummChange}
                />
                <input
                    name="operation-date"
                    type="date"
                    className="text-sm h-[30px] w-full text-slate-400 flex-5/12 rounded-lg px-2 border-[1px] border-sky-100/60"
                    value={formState.operationDate}
                    onChange={handleDateChange}
                />
            </div>

            <div className="flex flex-4/12 truncate">
                <span className="text-sm w-full truncate text-white/90">
                    {formState.selectedAccount?.name}
                </span>
            </div>
        </section>
    );
};
