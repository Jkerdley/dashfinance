import React from 'react';
import BankIcon from '../../assets/icons/bank-icon.svg';
import CashIcon from '../../assets/icons/cash-icon.svg';
import CryptoIcon from '../../assets/icons/crypto-icon.svg';
import InvestmentsIcon from '../../assets/icons/investments-icon.svg';
import AnalyticsIcon from '../../assets/icons/analytics-icon.svg';
import { MenuButton } from '../buttons/MenuButton';

export const MenuButtonsContainer = ({ isMenuOpened }) => {
	return (
		<nav name="menu-buttons" className="flex flex-6 w-full items-start justify-center py-10">
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
						<MenuButton
							width={'w-48'}
							to="/"
							alt="bank"
							icon={BankIcon}
							disabled={false}
							buttonText={'Все активы'}
						/>
						<MenuButton
							width={'w-48'}
							to="/finances"
							alt="cash"
							icon={CashIcon}
							disabled={false}
							buttonText={'Финансы'}
						/>
						<MenuButton
							width={'w-48'}
							to="/crypto"
							alt="crypto"
							icon={CryptoIcon}
							disabled={false}
							buttonText={'Криптовалюты'}
						/>
						<MenuButton
							width={'w-48'}
							to="/investments"
							alt="investments"
							icon={InvestmentsIcon}
							disabled={true}
							buttonText={'Инвестиции'}
						/>
						<MenuButton
							width={'w-48'}
							to="/analytics"
							alt="analytics"
							icon={AnalyticsIcon}
							disabled={true}
							buttonText={'Аналитика'}
						/>
					</>
				)}
			</div>
		</nav>
	);
};
