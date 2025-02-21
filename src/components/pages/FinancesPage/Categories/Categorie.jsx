import React from 'react';
import { CardIcon } from '../../../buttons';
import OptionsIcon from '../../../../assets/icons/options-icon.svg';
import DebitCardIcon from '../../../../assets/icons/income-debit-icon.svg';
import CreditCardIcon from '../../../../assets/icons/income-credit-card.svg';
import CashIcon from '../../../../assets/icons/income-cash.svg';
import GiftCardIcon from '../../../../assets/icons/income-present-card.svg';
import { EditButton } from '../../../buttons/EditButton';

export const Categorie = ({ categorie, balance, budget, icon }) => {
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
			default:
				return null;
		}
	};

	const isOverBalance = () => {
		if (!budget) {
			return 'text-lime-300';
		} else if (Number(balance) > Number(budget)) {
			return 'text-rose-300';
		} else {
			return 'text-lime-200';
		}
	};

	return (
		<div
			id="categorie-wrapper"
			className="flex flex-2 max-w-3xl items-center justify-between p-2 rounded-2xl h-14 bg-sky-300/20 "
		>
			<div id="categorie-inside-wrapper" className="flex items-center justify-start w-80">
				<CardIcon padding="p-2" buttonSize={10} icon={iconOfAccount()} />
				<div id="categorie-text-wrapper" className="flex  flex-col ml-2 w-full overflow-hidden">
					<p className="text-base truncate">{categorie}</p>
					<div id="categorie-budjet-wrapper" className="flex gap-2">
						<p className={`text-sm ${isOverBalance()}`}>Расходы: {balance}</p>
						<p className="text-sm truncate">{budget ? `Бюджет: ${budget}` : ''}</p>
					</div>
				</div>
			</div>
			<div id="categorie-icon-container" className="flex flex-[0.5] justify-end">
				<EditButton to={''} size={5} icon={OptionsIcon}></EditButton>
			</div>
		</div>
	);
};
