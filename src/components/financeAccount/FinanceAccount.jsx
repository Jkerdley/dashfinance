import React from 'react';
import { CardIcon } from '../buttons/CardIcon';
import Settings from '../../assets/icons/settings-icon.svg';
import DebitCardIcon from '../../assets/icons/income-debit-icon.svg';
import CreditCardIcon from '../../assets/icons/income-credit-card.svg';
import CashIcon from '../../assets/icons/income-cash.svg';
import GiftCardIcon from '../../assets/icons/income-present-card.svg';

export const FinanceAccount = ({ accountName, accountBalance, icon }) => {
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

	return (
		<div className="flex justify-start items-center h-14 w-[100%] mt-4 p-2 text-sm bg-sky-300/20 rounded-2xl">
			<div className="flex flex-[5] w-60 justify-start items-center">
				<CardIcon padding={'p-2'} buttonSize={10} icon={iconOfAccount()}></CardIcon>
				<div className="flex flex-col w-[100%] truncate px-2">
					<p className="text-base truncate">{accountName}</p>
					<p className="text-sm">Баланс: {accountBalance}</p>
				</div>
			</div>
			<div className="flex flex-[1] justify-end">
				<CardIcon size={5} icon={Settings} noBackground={true}></CardIcon>
			</div>
		</div>
	);
};
