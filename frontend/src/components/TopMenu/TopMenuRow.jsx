import React, { useState } from 'react';
import DashLogo from '../../assets/icons/dash-logo-main-white.svg';
import Avatar from '../../assets/pictures/avatar.jpg';

import Settings from '../../assets/icons/settings-icon.svg';
import Alerts from '../../assets/icons/bell-icon.svg';
import { Button } from '../buttons/Button';
import { BurgerButton, CurrencyToggle } from '../buttons';
import { SearchInput } from '../SearchInput/SearchInput';

export const TopMenuRow = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<section className="flex items-center justify-between flex-1 px-4 rounded-3xl">
				<div className="flex gap-4 items-center">
					<BurgerButton isOpen={isMenuOpen} onClick={setIsMenuOpen} />
					<a href="/">
						<img className="2xl:h-11 lg:h-10 md:h-8 h-7" src={DashLogo} alt="DASH" />
					</a>
				</div>
				{/* <SearchInput /> */}
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
