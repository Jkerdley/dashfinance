import { useState, useCallback, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CurrencyToggle } from '../../buttons';
import { useCurrency } from '../../../hooks';
import { FinalResultNewOperationItem, OperationSelectors, SaveAndCancelButtons } from '../operationSelectors';
import { useGetAccountsQuery, useAddHistoryMutation } from '../../../store/api/backendApi';

interface AddOperationFormProps {
    onClose: () => void;
    operationType: 'add' | 'spend';
}

export const AddOperationForm = ({ onClose, operationType }: AddOperationFormProps) => {
    const { isUSD, rubleCourse } = useCurrency();
    const { data: accounts = [] } = useGetAccountsQuery();
    const [addHistory] = useAddHistoryMutation();

    const [formState, setFormState] = useState({
        operationDate: new Date().toISOString().split('T')[0],
        operationSumm: '',
        selectedAccount: null as any,
        incomeType: '',
    });

    useEffect(() => {
        if (accounts.length > 0) {
            const shouldUpdate =
                !formState.selectedAccount || !accounts.some((a: any) => a.id === formState.selectedAccount?.id);

            if (shouldUpdate) {
                setFormState((prev) => ({
                    ...prev,
                    selectedAccount: accounts[0],
                }));
            }
        }
    }, [accounts]);

    const handleAccountChange = useCallback(
        (selectedId: string) => {
            const account = accounts.find((account: any) => account.id.toString() === selectedId);
            setFormState((prev) => ({ ...prev, selectedAccount: account }));
        },
        [accounts],
    );

    const handleSummChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        if (value === '' || !isNaN(Number(value))) {
            setFormState((prev) => ({ ...prev, operationSumm: value }));
        } else {
            alert('Пожалуйста, введите цифры');
        }
    }, []);

    const handleIncomeTypeChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormState((prev) => ({ ...prev, incomeType: value }));
    }, []);

    const handleDateChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, operationDate: event.target.value }));
    }, []);

    const handleFormSubmit = useCallback(
        async (event?: FormEvent<HTMLFormElement>) => {
            event?.preventDefault();

            try {
                if (!formState.selectedAccount || !formState.incomeType) {
                    alert('Выберите счет и напишите источник дохода');
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

                const formDataToSend = {
                    tag: 'finance',
                    account: formState.selectedAccount.name,
                    accountId: accountId,
                    category: formState.incomeType,
                    categoryId: 'income',
                    icon: formState.selectedAccount.icon,
                    amount: amountToSend,
                    date: formState.operationDate,
                    type: 'add' as 'add' | 'spend',
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
        if (!accounts.length) {
            onClose();
            alert('Сначала необходимо добавить счета');
        }
    }, [accounts.length, onClose]);

    if (!accounts.length) return null;

    return (
        <form
            id="selectors__header__and_buttons"
            className="flex flex-col justify-between items-center gap-8 min-h-[40vh]"
            onSubmit={handleFormSubmit}
        >
            <div className="flex flex-col gap-6 items-center justify-center">
                <h3>ДОБАВИТЬ ОПЕРАЦИЮ</h3>
                <CurrencyToggle />
            </div>

            <OperationSelectors
                formState={formState}
                accounts={accounts}
                categories={[]}
                onAccountChange={handleAccountChange}
                onCategoryChange={() => {}}
                handleIncomeTypeChange={handleIncomeTypeChange}
                isAddOperation={true}
            />

            <FinalResultNewOperationItem
                handleSummChange={handleSummChange}
                handleDateChange={handleDateChange}
                formState={formState}
                isUSD={isUSD}
                isAddOperation={true}
            />

            <SaveAndCancelButtons onClose={onClose} />
        </form>
    );
};
