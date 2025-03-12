import React from 'react';
import { OptionsButton } from '../../../components/buttons';
import { CardIcon } from '../../../components/CardIcon';
import DebitCardIcon from '../../../assets/icons/income-debit-icon.svg';
import CreditCardIcon from '../../../assets/icons/income-credit-card.svg';
import CashIcon from '../../../assets/icons/income-cash.svg';
import GiftCardIcon from '../../../assets/icons/income-present-card.svg';
import { useDispatch } from 'react-redux';
import { openUpdateAccountModal } from '../../../store/actions';

export const FinanceAccount = ({ id, accountName, accountBalance, icon, noButton }) => {
	const dispatch = useDispatch();
	const iconOfAccount = () => {
		switch (icon) {
			case 'debit':
				return DebitCardIcon;
			case 'credit':
				return CreditCardIcon;
			case 'cash':
				return CashIcon;
			case 'gift':
				return GiftCardIcon;
		}
	};

	const handleOptionsClick = () => {
		dispatch(openUpdateAccountModal(id));
	};

	return (
		<div
			className={`flex justify-start items-center h-14 ${noButton ? 'flex-2' : ''} ${noButton ? 'w-[90%]' : 'w-[100%]'} p-2 text-sm bg-sky-300/20 rounded-2xl`}
		>
			<div className="flex flex-5 sm:w-64 w-50 justify-start items-center">
				<CardIcon padding={'p-2'} buttonSize={10} icon={iconOfAccount()}></CardIcon>
				<div className="flex flex-col w-[100%] truncate px-2">
					<p className="text-base truncate">{accountName}</p>
					<p className="text-sm text-slate-300">
						<span>Баланс: </span>
						<span
							className={`${accountBalance.slice(1).trim() >= 0 ? 'text-main-green' : 'text-main-red'}`}
						>
							{accountBalance}
						</span>
					</p>
				</div>
			</div>
			{noButton ? '' : <OptionsButton onClick={handleOptionsClick} flex={'flex-1'} />}
		</div>
	);
};
