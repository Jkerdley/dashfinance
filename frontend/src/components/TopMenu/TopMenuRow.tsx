import { useNavigate, Link } from 'react-router-dom';

import DashLogo from '../../assets/icons/dash-logo-main-white.svg';
import Avatar from '../../assets/pictures/avatar.jpg';
import Settings from '../../assets/icons/settings-icon.svg';
import Alerts from '../../assets/icons/bell-icon.svg';

import { Button } from '../buttons/Button';
import { BurgerButton, CurrencyToggle } from '../buttons';

import { openModal, closeModal, selectCurrentModal } from '../../store/slices/modalSlice';
import { MODAL_TYPES } from '../../constants/modals';
import { useLogoutMutation, backendApi, useGetUserQuery } from '../../store/api/backendApi';
import { APP_ROUTES } from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

export const TopMenuRow = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { data } = useGetUserQuery();
    const user = data?.user || { name: 'Гость' };

    const { modalType } = useAppSelector(selectCurrentModal);
    const isBurgerOpen = modalType === MODAL_TYPES.BURGER_MENU;

    const [logoutMutation] = useLogoutMutation();

    const logout = async () => {
        try {
            await logoutMutation().unwrap();
            dispatch(backendApi.util.resetApiState());
            navigate(APP_ROUTES.LOGIN);
        } catch (err) {
            console.error('Ошибка выхода:', err);
        }
    };

    const handleBurgerClick = () => {
        if (isBurgerOpen) {
            dispatch(closeModal());
        } else {
            dispatch(openModal({ modalType: MODAL_TYPES.BURGER_MENU }));
        }
    };

    const handleOpenSettings = () => {
        dispatch(openModal({ modalType: MODAL_TYPES.USER_SETTINGS }));
    };

    return (
        <header className="flex flex-wrap md:flex-nowrap items-center justify-between px-4 rounded-3xl gap-4">
            <div className="flex gap-4 items-center">
                <BurgerButton isOpen={isBurgerOpen} onClick={handleBurgerClick} />

                <Link to={APP_ROUTES.HOME}>
                    <img className="h-7 md:h-8 lg:h-10 2xl:h-11" src={DashLogo} alt="DASH" />
                </Link>
            </div>

            <div className="flex items-center sm:justify-end justify-between w-full lg:gap-4 gap-2">
                <CurrencyToggle />

                <div className="flex items-center justify-around border-0 p-[4px] rounded-2xl bg-gray-300/10 min-w-2 md:gap-2 gap-1">
                    <Button alt="Alerts" icon={Alerts} disabled />
                    <Button onClick={handleOpenSettings} alt="Settings" icon={Settings} />
                </div>

                <img className="h-16 rounded-2xl sm:flex hidden" src={Avatar} alt="avatar" />

                <div className="flex flex-col items-start">
                    <span className="font-medium text-lg sm:flex hidden">Привет, {user.name}</span>

                    <button
                        className="font-medium text-sky-50/80 cursor-pointer hover:underline hover:text-blue-300 transition-all duration-150 ease-in-out bg-transparent border-none p-0"
                        onClick={logout}
                        type="button"
                    >
                        Выйти
                    </button>
                </div>
            </div>
        </header>
    );
};
