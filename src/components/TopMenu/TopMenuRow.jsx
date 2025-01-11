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
					<img className="h-12" src={DashLogo} alt="DASH" />
				</a>
				<div className="flex items-center justify-between">
					<input
						name="search"
						className="w-96 h-10 rounded-xl bg-gray-200/40 pr-12 pl-2 transition-shadow duration-200 ease-in"
						type="text"
					/>
					<button className="ml-[-36px]">
						<img className="h-6" src={SearchIcon} alt="search" />
					</button>
				</div>

				<div className="login-and-avatar">
					<div className="flex items-center gap-1 justify-center">
						<p className="flex font-semibold">USD</p> <div className="triangle"></div>
					</div>
					<div className="settings-and-alert">
						<Button alt="Settings" icon={Settings} />
						<Button alt="Alerts" icon={Alerts} disabled={true} />
					</div>
					<img className="avatar" src={Avatar} alt="avatar" />
					<div className="name-and-role">
						<p className="login">Hi, Eugene Erdle</p>
						<p className="font-medium">Выйти</p>
					</div>
				</div>
			</div>
		</>
	);
};
