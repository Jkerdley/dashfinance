import React from 'react';
import './styles/top-menu-styles.css';
import DashLogo from '../../assets/icons/dash-logo-main-white.svg';
import Avatar from '../../assets/pictures/avatar.jpg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import Settings from '../../assets/icons/settings-icon.svg';
import Alerts from '../../assets/icons/bell-icon.svg';
import { Button } from '../buttons/Button';
export const TopMenuRow = () => {
	return (
		<>
			<div className="flex items-center justify-between flex-1 px-1 rounded-3xl">
				<a href="/">
					<img className="dash-logo" src={DashLogo} alt="DASH IO" />
				</a>
				<div className="search-wrapper">
					<input className="search-input-top-menu" type="text" />
					<button className="active-button search-button">
						<img className="h-6" src={SearchIcon} alt="search" />
					</button>
				</div>

				<div className="login-and-avatar">
					<div className="settings-and-alert">
						<Button alt="Settings" icon={Settings} />
						<Button alt="Alerts" icon={Alerts} disabled={true} />
					</div>
					<img className="avatar" src={Avatar} alt="avatar" />
					<div className="name-and-role">
						<p className="login">Hi, Eugene Erdle</p>
						<p>Your role: admin</p>
					</div>
				</div>
			</div>
		</>
	);
};
