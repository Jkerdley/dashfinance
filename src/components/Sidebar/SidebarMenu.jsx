import './styles/SidebarMenuStyles.css';
import SlideRight from '../../assets/icons/slider-right-icon.svg';
import DayTheme from '../../assets/icons/day-icon.svg';
import NightTheme from '../../assets/icons/night-icon.svg';
import BankIcon from '../../assets/icons/bank-icon.svg';
import CashIcon from '../../assets/icons/cash-icon.svg';
import CryptoIcon from '../../assets/icons/crypto-icon.svg';
import InvestmentsIcon from '../../assets/icons/investments-icon.svg';
import AnalyticsIcon from '../../assets/icons/analytics-icon.svg';
import { MenuButton } from '../buttons/MenuButton';

export const SidebarMenu = () => {
	return (
		<aside className="side-menu">
			<div className="aside-top-wrapper">
				<div className="welcome-board">
					<p className="welcome-text">WELCOME</p>
					<p>
						You was here <br />
						20.12.2024
					</p>
				</div>
			</div>
			<menu className="aside-center-wrapper">
				<div className="buttons-in-menu">
					<MenuButton alt="bank" icon={BankIcon} />
					<MenuButton alt="cash" icon={CashIcon} />
					<MenuButton alt="crypto" icon={CryptoIcon} />
					<MenuButton alt="investments" icon={InvestmentsIcon} disabled={true} />
					<MenuButton alt="analytics" icon={AnalyticsIcon} disabled={true} />
				</div>
			</menu>

			<div className="menu-bottom-wrapper">
				<button className="active-button">
					<img className="h-5" src={SlideRight} alt="search" />
				</button>
				<div className="day-night-switcher">
					<button className="active-button">
						<img className="h-6" src={DayTheme} alt="search" />
					</button>
					<button className="active-button">
						<img className="h-5" src={NightTheme} alt="search" />
					</button>
				</div>
			</div>
		</aside>
	);
};
