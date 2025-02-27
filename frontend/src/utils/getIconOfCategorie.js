import DebitCardIcon from '../assets/icons/income-debit-icon.svg';
import CreditCardIcon from '../assets/icons/income-credit-card.svg';
import CashIcon from '../assets/icons/income-cash.svg';
import GiftCardIcon from '../assets/icons/income-present-card.svg';

export const getIconOfCategorie = (icon) => {
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
