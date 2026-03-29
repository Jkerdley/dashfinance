import { useDispatch } from 'react-redux';
import { OptionsButton } from '../../../components/buttons';
import { CardIcon } from '../../../components/CardIcon';
import { openModal } from '../../../store/slices/modalSlice';
import { MODAL_TYPES } from '../../../constants/modals';

import DebitCardIcon from '../../../assets/icons/income-debit-icon.svg';
import CreditCardIcon from '../../../assets/icons/income-credit-card.svg';
import CashIcon from '../../../assets/icons/income-cash.svg';
import GiftCardIcon from '../../../assets/icons/income-present-card.svg';

import type { FormattedAccount } from '../../../hooks/useFetchAccountsInCurrency';

interface FinanceAccountProps {
    id: string;
    accountName: string;
    accountBalance: string;
    icon: string;
    noButton?: boolean;
    accountsInCurrency?: FormattedAccount[];
}

const ACCOUNT_ICONS: Record<string, string> = {
    debit: DebitCardIcon,
    credit: CreditCardIcon,
    cash: CashIcon,
    gift: GiftCardIcon,
};

export const FinanceAccount = (props: FinanceAccountProps) => {
    const {
        id,
        accountName,
        accountBalance,
        icon,
        noButton = false,
        accountsInCurrency
    } = props;

    const dispatch = useDispatch();

    const handleOptionsClick = () => {
        dispatch(
            openModal({
                modalType: MODAL_TYPES.UPDATE_ACCOUNT,
                modalProps: {
                    accountId: id,
                    accountsInCurrency,
                },
            }),
        );
    };

    const balanceValue = parseFloat((accountBalance || '0').replace(/[^\d.-]/g, ''));
    const balanceColorClass = balanceValue >= 0 ? 'text-main-green' : 'text-main-red';

    return (
        <div
            className={`flex justify-start items-center h-14 p-2 text-sm bg-sky-300/20 rounded-2xl
                ${noButton ? 'flex-2 md:min-w-[23vw] min-w-[35vw]' : 'w-full'}`}
        >
            <div className="flex flex-5 sm:w-64 w-50 justify-start items-center overflow-hidden">
                <CardIcon padding="p-2" buttonSize={10} icon={ACCOUNT_ICONS[icon] || ACCOUNT_ICONS.debit} />

                <div className="flex flex-col w-full truncate px-2">
                    <p className="text-base truncate font-medium text-white">{accountName}</p>
                    <p className="text-sm text-slate-300">
                        <span>Баланс: </span>
                        <span className={`font-semibold ${balanceColorClass}`}>{accountBalance}</span>
                    </p>
                </div>
            </div>

            {!noButton && <OptionsButton onClick={handleOptionsClick} flex="flex-1" />}
        </div>
    );
};
