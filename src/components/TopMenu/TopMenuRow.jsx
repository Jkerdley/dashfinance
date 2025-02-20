import React, { useState } from 'react';
import './styles/top-menu-styles.css';
import DashLogo from '../../assets/icons/dash-logo-main-white.svg';
import Avatar from '../../assets/pictures/avatar.jpg';
import SearchIcon from '../../assets/icons/search-icon.svg';
import Settings from '../../assets/icons/settings-icon.svg';
import Alerts from '../../assets/icons/bell-icon.svg';
import { Button } from '../buttons/Button';
import { BurgerButton, CurrencyToggle } from '../buttons';

export const TopMenuRow = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<section className="flex items-center justify-between flex-1 px-4 rounded-3xl">
				<div className="flex gap-5 items-center">
					<BurgerButton isOpen={isMenuOpen} onClick={setIsMenuOpen} />
					{/* <Button></Button> */}
					<a href="/">
						<img className="dash-logo" src={DashLogo} alt="DASH" />
					</a>
				</div>
				<div className="flex items-center justify-between">
					<input
						name="search"
						className="w-auto 2xl:w-120 h-10 rounded-xl bg-gray-200/40 pr-12 pl-2 transition-shadow duration-200 ease-in"
						type="text"
					/>
					<button className="ml-[-36px]">
						<img className="h-6" src={SearchIcon} alt="search" />
					</button>
				</div>

				<div className="login-and-avatar">
					<CurrencyToggle />

					<div
						id="settings-and-alert"
						className="flex items-center justify-around border-0 p-[5px] rounded-2xl bg-slate-400/30  w-24 gap-1.5"
					>
						<Button alt="Settings" icon={Settings} />
						<Button alt="Alerts" icon={Alerts} disabled={true} />
					</div>
					<img className="avatar" src={Avatar} alt="avatar" />
					<div className="name-and-role">
						<p className="login">Hi, Eugene Erdle</p>
						<p className="font-medium">
							<a href="">Выйти</a>
						</p>
					</div>
				</div>
			</section>
		</>
	);
};
