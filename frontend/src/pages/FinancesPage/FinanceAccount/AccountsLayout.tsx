import { useDispatch } from 'react-redux';
import AddIcon from '../../../assets/icons/add-icon.svg';
import { FinanceAccount } from './FinanceAccount';
import { EditAddDeleteButton } from '../../../components/buttons/EditAddDeleteButton';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { useFetchAccountsInCurrency } from '../../../hooks/useFetchAccountsInCurrency';
import { Loader } from '../../../components/Loaders/Loader';
import { openModal } from '../../../store/slices/modalSlice';
import { MODAL_TYPES } from '../../../constants/modals';

export const AccountsLayout = () => {
    const dispatch = useDispatch();
    const { accountsInCurrency, isLoading } = useFetchAccountsInCurrency();

    const handleAddAccount = () => {
        dispatch(
            openModal({
                modalType: MODAL_TYPES.ADD_ACCOUNT,
            }),
        );
    };

    return (
        <section
            id="accouts__main__container"
            className="flex flex-col flex-8 p-4 rounded-3xl bg-sky-950/40 gap-0.5 snap-start"
        >
            <div id="accouts__header-and-button" className="flex gap-2 justify-between">
                <SectionContainerHeader title={'Счета'} />
                <EditAddDeleteButton
                    icon={AddIcon}
                    onClick={handleAddAccount}
                    title={'Добавить'}
                    alt={'Финансовые счета'}
                />
            </div>

            {isLoading ? (
                <Loader />
            ) : accountsInCurrency.length === 0 ? (
                <span className="flex items-center justify-center mt-20 text-slate-400">Добавьте счета</span>
            ) : (
                <div
                    id="accouts__wrapper"
                    className="flex flex-col pr-1 mt-1 max-h-[33vh] rounded-[18px] overflow-y-auto overscroll-auto scrollbar"
                >
                    {accountsInCurrency.map((account) => (
                        <div key={account.id} className="mt-4">
                            <FinanceAccount
                                id={account.id}
                                accountName={account.name}
                                accountBalance={account.balance}
                                icon={account.icon}
                                accountsInCurrency={accountsInCurrency}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};
