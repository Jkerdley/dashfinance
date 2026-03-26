import BankIcon from '../assets/icons/bank-icon.svg';
import CashIcon from '../assets/icons/cash-icon.svg';
import CryptoIcon from '../assets/icons/crypto-icon.svg';
import InvestmentsIcon from '../assets/icons/investments-icon.svg';
import AnalyticsIcon from '../assets/icons/analytics-icon.svg';
import { APP_ROUTES } from '../constants/routes';

export const MENU_CONFIG = [
	{ id: 'assets', to: APP_ROUTES.HOME, icon: BankIcon, text: 'Все активы', disabled: false },
	{ id: 'finances', to: APP_ROUTES.FINANCES, icon: CashIcon, text: 'Финансы', disabled: false },
	{ id: 'crypto', to: APP_ROUTES.CRYPTO, icon: CryptoIcon, text: 'Криптовалюты', disabled: false },
	{
		id: 'investments',
		to: APP_ROUTES.INVESTMENTS,
		icon: InvestmentsIcon,
		text: 'Инвестиции',
		disabled: true,
	},
	{ id: 'analytics', to: APP_ROUTES.ANALYTICS, icon: AnalyticsIcon, text: 'Аналитика', disabled: true },
];
