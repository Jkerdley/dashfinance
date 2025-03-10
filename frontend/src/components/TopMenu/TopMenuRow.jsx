import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DashLogo from '../../assets/icons/dash-logo-main-white.svg';
import Avatar from '../../assets/pictures/avatar.jpg';
import Settings from '../../assets/icons/settings-icon.svg';
import Alerts from '../../assets/icons/bell-icon.svg';
import { Button } from '../buttons/Button';
import { BurgerButton, CurrencyToggle } from '../buttons';
import { request } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONS } from '../../store/actionTypes';

import { selectUser, selectUserModal } from '../../store/selectors';
import { UpdateUserModal } from '../modalWindow/UpdateUserModal';
import { closeUserModal, openUserModal } from '../../store/actions';

export const TopMenuRow = ({ onBurgerClick, isBurgerMenuOpen }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const userModal = useSelector(selectUserModal);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	const logout = async () => {
		try {
			await request('/auth/logout', 'POST');
			dispatch({ type: ACTIONS.CLEAR_USER_DATA });
			localStorage.removeItem('user');
			window.location.href = '/login';
		} catch (err) {
			console.error('Ошибка выхода:', err);
		}
	};

	useEffect(() => {
		setIsMenuOpen(isBurgerMenuOpen);
	}, [isBurgerMenuOpen]);

	const handleBurgerClick = () => {
		setIsMenuOpen(!isMenuOpen);
		onBurgerClick();
	};

	return (
		<section className="flex items-center justify-between flex-1 px-4 rounded-3xl">
			<div className="flex gap-4 items-center">
				<BurgerButton isOpen={isMenuOpen} onClick={handleBurgerClick} />
				<a href="/">
					<img className="h-7 md:h-8 lg:h-10 2xl:h-11" src={DashLogo} alt="DASH" />
				</a>
			</div>
			{userModal.isOpen && (
				<UpdateUserModal isOpen={userModal.isOpen} onClose={() => dispatch(closeUserModal())} />
			)}
			<div className="flex items-center gap-4">
				<CurrencyToggle />
				<div className="flex items-center justify-around border-0 p-[5px] rounded-2xl bg-gray-300/10 w-24 gap-1.5">
					<Button alt="Alerts" icon={Alerts} disabled={true} />
					<Button onClick={() => dispatch(openUserModal())} alt="Settings" icon={Settings} />
				</div>
				<img className="h-16 rounded-2xl" src={Avatar} alt="avatar" />
				<div className="flex flex-col items-start">
					<span className="font-medium text-lg">Привет, {user.name}</span>
					<a
						className="font-medium text-sky-50/80 cursor-pointer hover:underline hover:text-blue-300 transition-all duration-150 ease-in-out"
						onClick={logout}
					>
						Выйти
					</a>
				</div>
			</div>
		</section>
	);
};

TopMenuRow.propTypes = {
	onBurgerClick: PropTypes.func.isRequired,
	isBurgerMenuOpen: PropTypes.bool,
};
