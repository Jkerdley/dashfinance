import React, { useState, useEffect } from 'react';
import DashLogo from '../../assets/icons/dash-logo-main-white.svg';
import Avatar from '../../assets/pictures/avatar.jpg';
import Settings from '../../assets/icons/settings-icon.svg';
import Alerts from '../../assets/icons/bell-icon.svg';
import { Button } from '../buttons/Button';
import { BurgerButton, CurrencyToggle } from '../buttons';
import { request } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { selectBurgerModal, selectUser, selectUserModal } from '../../store/selectors';
import { UpdateUserModal } from '../modalWindow/UpdateUserModal';
import { closeUserModal, openBurgerModal, openUserModal } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { ACTIONS } from '../../store/actionTypes';

export const TopMenuRow = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const userModal = useSelector(selectUserModal);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const burgerModal = useSelector(selectBurgerModal);
	const navigate = useNavigate();

	const logout = async () => {
		try {
			await request('/auth/logout', 'POST');
			dispatch({ type: ACTIONS.CLEAR_USER_DATA });
			dispatch({ type: ACTIONS.CLEAR_ACCOUNTS_DATA });
			dispatch({ type: ACTIONS.CLEAR_CATEGORIES_DATA });
			dispatch({ type: ACTIONS.CLEAR_CRYPTODATA_DATA });
			dispatch({ type: ACTIONS.CLEAR_HISTORY_DATA });
			navigate('/login');
		} catch (err) {
			console.error('Ошибка выхода:', err);
		}
	};

	useEffect(() => {
		setIsMenuOpen(burgerModal.isOpen);
	}, [burgerModal.isOpen]);

	const handleBurgerClick = () => {
		setIsMenuOpen(!isMenuOpen);
		dispatch(openBurgerModal());
	};

	return (
		<section className="flex flex-wrap md:flex-nowrap items-center justify-between px-4 rounded-3xl gap-4">
			<div className="flex gap-4 items-center">
				<BurgerButton isOpen={isMenuOpen} onClick={handleBurgerClick} />
				<a href="/">
					<img className="h-7 md:h-8 lg:h-10 2xl:h-11" src={DashLogo} alt="DASH" />
				</a>
			</div>
			{userModal.isOpen && (
				<UpdateUserModal isOpen={userModal.isOpen} onClose={() => dispatch(closeUserModal())} />
			)}
			<div className="flex items-center sm:justify-end justify-between w-full lg:gap-4 gap-2">
				<CurrencyToggle />
				<div className="flex  items-center justify-around border-0 p-[4px] rounded-2xl bg-gray-300/10 min-w-2 md:gap-2 gap-1">
					<Button alt="Alerts" icon={Alerts} disabled={true} />
					<Button onClick={() => dispatch(openUserModal())} alt="Settings" icon={Settings} />
				</div>
				<img className="h-16 rounded-2xl sm:flex hidden" src={Avatar} alt="avatar" />
				<div className="flex flex-col items-start">
					<span className="font-medium text-lg sm:flex hidden">Привет, {user.name}</span>
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
