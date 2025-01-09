import React from 'react';
import BankIcon from '../../assets/icons/bank-icon.svg';
import CashIcon from '../../assets/icons/cash-icon.svg';
import CryptoIcon from '../../assets/icons/crypto-icon.svg';
import InvestmentsIcon from '../../assets/icons/investments-icon.svg';
import AnalyticsIcon from '../../assets/icons/analytics-icon.svg';
import { MenuButton } from '../buttons/MenuButton';
import { WideMenuButton } from '../buttons/WideMenuButton';

export const Menu = ({ isMenuOpened }) => {
	return (
		<nav name="menu-buttons" className="flex basis-5/12 w-full items-start justify-center py-6">
			<div className="flex flex-col items-start gap-8 justify-around ">
				{isMenuOpened ? (
					<>
						<MenuButton alt="bank" icon={BankIcon} />

						<MenuButton alt="cash" icon={CashIcon} />
						<MenuButton alt="crypto" icon={CryptoIcon} />
						<MenuButton alt="investments" icon={InvestmentsIcon} disabled={true} />
						<MenuButton alt="analytics" icon={AnalyticsIcon} disabled={true} />
					</>
				) : (
					<>
						<WideMenuButton alt={'bank'} icon={BankIcon} buttonText={'Все активы'} />
						<WideMenuButton alt={'cash'} icon={CashIcon} buttonText={'Финансы'} />
						<WideMenuButton alt={'crypto'} icon={CryptoIcon} buttonText={'Криптовалюты'} />
						<WideMenuButton
							alt={'investments'}
							icon={InvestmentsIcon}
							buttonText={'Инвестиции'}
							disabled={true}
						/>
						<WideMenuButton
							alt={'analytics'}
							icon={AnalyticsIcon}
							buttonText={'Аналитика'}
							disabled={true}
						/>
					</>
				)}
			</div>
		</nav>
	);
};
