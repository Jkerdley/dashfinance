import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SidebarMenu } from './components/Sidebar';
import { TopMenuRow } from './components/TopMenu';
import { BurgerMenuModal, AddOperationModal, AddCryptoOperationModal } from './components/modalWindow';
import { CryptoLayout } from './pages/CryptoPage';
import { FinancesLayout } from './pages/FinancesPage/';
import { selectUserIsLoading } from './store/selectors';
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
	const userIsLoading = useSelector(selectUserIsLoading);
	const isDayTheme = useSelector((state) => state.theme.isDayTheme);

	useEffect(() => {
		if (userIsLoading) {
			const fetchUser = async () => {
				try {
					const data = await request('/auth/user', 'GET');
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
		}
	}, [userIsLoading]);

	useEffect(() => {
		if (isDayTheme) {
			document.body.classList.add('body-day');
			document.body.classList.remove('body-night');
		} else {
			document.body.classList.add('body-night');
			document.body.classList.remove('body-day');
		}
	}, [isDayTheme]);

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
								<BurgerMenuModal />
								<AddOperationModal />
								<AddCryptoOperationModal />
								<SidebarMenu />
								<div className="flex flex-col flex-15 p-4 gap-4 rounded-4xl bg-sky-300/5">
									<TopMenuRow />
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
				{/* <Route path="*" element={<Navigate to={'/login'} replace />} /> */}
			</Routes>
		</section>
	);
};
