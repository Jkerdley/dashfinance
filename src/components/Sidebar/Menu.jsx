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
		<nav name="menu-buttons" className="flex flex-[6] w-full items-start justify-center py-10">
			<div className="flex flex-col items-start gap-8 justify-around ">
				{isMenuOpened ? (
					<>
						<MenuButton width={'w-11'} to="/" alt="bank" icon={BankIcon} />
						<MenuButton width={'w-11'} to="/finances" alt="cash" icon={CashIcon} />
						<MenuButton width={'w-11'} to="/crypto" alt="crypto" icon={CryptoIcon} />
						<MenuButton
							width={'w-11'}
							to="/investments"
							alt="investments"
							icon={InvestmentsIcon}
							disabled={true}
						/>
						<MenuButton
							width={'w-11'}
							to="/analytics"
							alt="analytics"
							icon={AnalyticsIcon}
							disabled={true}
						/>
					</>
				) : (
					<>
						<WideMenuButton to="/" alt={'bank'} icon={BankIcon} buttonText={'Все активы'} />
						<WideMenuButton to="/finances" alt={'cash'} icon={CashIcon} buttonText={'Финансы'} />
						<WideMenuButton
							to="/crypto"
							alt={'crypto'}
							icon={CryptoIcon}
							buttonText={'Криптовалюты'}
						/>
						<WideMenuButton
							to="/investments"
							alt={'investments'}
							icon={InvestmentsIcon}
							buttonText={'Инвестиции'}
							disabled={true}
						/>
						<WideMenuButton
							to="/analytics"
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
