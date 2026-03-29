import { useState, useCallback, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CurrencyToggle } from '../../buttons';
import { useCurrency, useFetchCategoriesInCurrency } from '../../../hooks';
import {
    FinalResultNewOperationItem,
    OperationSelectors,
    SaveAndCancelButtons,
    SelectedCategories,
} from '../operationSelectors';
import {
    useGetAccountsQuery,
    useAddHistoryMutation,
} from '../../../store/api/backendApi';
import { SORT_TYPES } from '../../../constants/operations';

interface SpendOperationFormProps {
    onClose: () => void;
    operationType: 'add' | 'spend';
}

export const SpendOperationForm = ({ onClose, operationType }: SpendOperationFormProps) => {
    const { isUSD, rubleCourse } = useCurrency();
    const { data: accounts = [] } = useGetAccountsQuery();
    const { categoriesInCurrency: categories = [] } = useFetchCategoriesInCurrency(SORT_TYPES.MONTH);
    const [addHistory] = useAddHistoryMutation();

    const [formState, setFormState] = useState({
        operationDate: new Date().toISOString().split('T')[0],
        operationSumm: '',
        selectedAccount: null as any,
        selectedCategory: null as any,
    });

    useEffect(() => {
        if (accounts.length > 0 && categories.length > 0) {
            const shouldUpdate =
                !formState.selectedAccount ||
                !formState.selectedCategory ||
                !accounts.some((a: any) => a.id === formState.selectedAccount?.id) ||
                !categories.some((c: any) => c.id === formState.selectedCategory?.id);

            if (shouldUpdate) {
                setFormState((prev) => ({
                    ...prev,
                    selectedAccount: accounts[0],
                    selectedCategory: categories[0],
                }));
            }
        }
    }, [accounts, categories]);

    const handleAccountChange = useCallback(
        (selectedId: string) => {
            const account = accounts.find((account: any) => account.id.toString() === selectedId);
            setFormState((prev) => ({ ...prev, selectedAccount: account }));
        },
        [accounts],
    );

    const handleCategoryChange = useCallback(
        (selectedId: string) => {
            const category = categories.find((category: any) => category.id.toString() === selectedId);
            setFormState((prev) => ({ ...prev, selectedCategory: category }));
        },
        [categories],
    );

    const handleSummChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === '' || !isNaN(Number(value))) {
            setFormState((prev) => ({ ...prev, operationSumm: value }));
        } else {
            alert('Пожалуйста, введите цифры');
        }
    }, []);

    const handleDateChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, operationDate: event.target.value }));
    }, []);

    const handleFormSubmit = useCallback(
        async (event?: FormEvent<HTMLFormElement>) => {
            event?.preventDefault();

            try {
                if (!formState.selectedAccount || !formState.selectedCategory) {
                    alert('Выберите счет и категорию');
                    return;
                }

                if (!formState.operationSumm) {
                    alert('Введите сумму операции');
                    return;
                }

                if (Number(formState.operationSumm) < 0) {
                    alert('Сумма должна быть больше нуля');
                    return;
                }

                const safeRubleCourse = rubleCourse || 1;
                const summNumber = Number(formState.operationSumm);
                const amountToSend = Math.abs(isUSD ? summNumber * safeRubleCourse : summNumber);

                const accountId = formState.selectedAccount.id || formState.selectedAccount._id;
                const categoryId = formState.selectedCategory.id || formState.selectedCategory._id;

                const formDataToSend = {
                    tag: 'finance',
                    account: formState.selectedAccount.name,
                    accountId: accountId,
                    category: formState.selectedCategory.name,
                    categoryId: categoryId,
                    icon: formState.selectedCategory.icon,
                    amount: amountToSend,
                    date: formState.operationDate,
                    type: (operationType || 'spend') as 'add' | 'spend',
                    comment: '',
                };

                await addHistory(formDataToSend).unwrap();
                onClose();
            } catch (error: any) {
                alert(`Ошибка: ${error.data?.error || error.message || 'Неизвестная ошибка'}`);
            }
        },
        [formState, isUSD, rubleCourse, operationType, onClose, addHistory],
    );

    useEffect(() => {
        if (!accounts.length || !categories.length) {
            onClose();
            alert('Сначала необходимо добавить счета и категории расходов');
        }
    }, [accounts.length, categories.length, onClose]);

    if (!accounts.length || !categories.length) return null;

    return (
        <form
            id="selectors__header__and_buttons"
            className="flex flex-col justify-between items-center gap-8 min-h-[45vh]"
            onSubmit={handleFormSubmit}
        >
            <div className="flex flex-col gap-6 items-center justify-center">
                <h3>ДОБАВИТЬ ОПЕРАЦИЮ</h3>
                <CurrencyToggle />
            </div>

            <OperationSelectors
                formState={formState}
                accounts={accounts}
                categories={categories}
                onAccountChange={handleAccountChange}
                onCategoryChange={handleCategoryChange}
                handleIncomeTypeChange={() => {}}
                isAddOperation={false}
            />

            <SelectedCategories formState={formState} />

            <FinalResultNewOperationItem
                handleSummChange={handleSummChange}
                handleDateChange={handleDateChange}
                formState={formState}
                isUSD={isUSD}
                isAddOperation={false}
            />

            <SaveAndCancelButtons onClose={onClose} />
        </form>
    );
};
