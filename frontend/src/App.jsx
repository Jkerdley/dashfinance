import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SidebarMenu } from './components/Sidebar';
import { TopMenuRow } from './components/TopMenu';
import { BurgerMenuModal, AddOperationModal } from './components/modalWindow';
import { CryptoLayout } from './pages/CryptoPage';
import { FinancesLayout } from './pages/FinancesPage/';
import {
	selectAccounts,
	selectCategories,
	selectIsAuthenticated,
	selectUser,
	selectUserIsLoading,
} from './store/selectors';
import { selectOperationModal, selectBurgerModal } from './store/selectors';
import { closeBurgerModal, closeOperationModal, openBurgerModal } from './store/actions/modalActions';
import { fetchUserData } from './store/actions/async/fetchUserData';
import { MainPageLayout } from './pages/MainPage/MainPageLayout';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { LoginWrapper } from './routes/LoginWrapper';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { request } from './utils';
import { Loader } from './components/Loaders/Loader';
import { setUserIsLoading } from './store/actions';

export const App = () => {
	const dispatch = useDispatch();
	const operationModal = useSelector(selectOperationModal);
	const burgerModal = useSelector(selectBurgerModal);
	const accountsData = useSelector(selectAccounts);
	const categoriesData = useSelector(selectCategories);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);
	const userIsLoading = useSelector(selectUserIsLoading);
	const isDayTheme = useSelector((state) => state.theme.isDayTheme);
	console.log('user before mounting', user);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await request('/auth/user', 'GET');
				console.log('data.user in APP', data.user);

				if (data.user) {
					dispatch(fetchUserData(data.user));
				}
			} catch (err) {
				console.error('Ошибка при получении данных пользователя:', err);
			} finally {
				dispatch(setUserIsLoading(false));
			}
		};

		fetchUser();
	}, [dispatch]);

	console.log('user after mounting', user);

	useEffect(() => {
		if (isDayTheme) {
			document.body.classList.add('body-day');
			document.body.classList.remove('body-night');
		} else {
			document.body.classList.add('body-night');
			document.body.classList.remove('body-day');
		}
	}, [isDayTheme]);

	const canShowOperationModal = accountsData.length > 0 && categoriesData.length > 0;

	const handleCloseBurgerModal = () => dispatch(closeBurgerModal());
	const handleCloseOperationModal = () => dispatch(closeOperationModal());
	const handleBurgerClick = () => dispatch(openBurgerModal());
	console.log('userIsLoading', userIsLoading);

	if (userIsLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader />
			</div>
		);
	}
	return (
		<section id="root" className="flex bg-cover w-full overflow-x-hidden min-h-screen p-4">
			<Routes>
				<Route
					path="/login"
					element={
						<LoginWrapper>
							<LoginPage />
						</LoginWrapper>
					}
				/>
				<Route
					path="/register"
					element={
						<LoginWrapper>
							<RegisterPage />
						</LoginWrapper>
					}
				/>

				<Route
					path="/*"
					element={
						<ProtectedRoute>
							<>
								<BurgerMenuModal
									isOpen={burgerModal.isOpen}
									onClose={handleCloseBurgerModal}
								/>

								{canShowOperationModal && (
									<AddOperationModal
										isOpen={operationModal.isOpen}
										operationType={operationModal.type}
										onClose={handleCloseOperationModal}
									/>
								)}

								<SidebarMenu />
								<div className="flex flex-col flex-15 p-4 gap-4 rounded-4xl bg-sky-300/5">
									<TopMenuRow
										onBurgerClick={handleBurgerClick}
										isBurgerMenuOpen={burgerModal.isOpen}
									/>
									<div className="flex flex-wrap rounded-[36px] h-full gap-4">
										<Routes>
											<Route path="/" element={<MainPageLayout />} />
											<Route path="/finances" element={<FinancesLayout />} />
											<Route path="/crypto" element={<CryptoLayout />} />
											<Route path="*" element={<Navigate to="/" replace />} />
										</Routes>
									</div>
								</div>
							</>
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
			</Routes>
		</section>
	);
};
