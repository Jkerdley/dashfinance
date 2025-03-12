import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { SidebarMenu } from './components/Sidebar';
import { TopMenuRow } from './components/TopMenu';
import { BurgerMenuModal, AddOperationModal } from './components/modalWindow';
import { CryptoLayout } from './pages/CryptoPage';
import { FinancesLayout } from './pages/FinancesPage/';
import { selectAccounts, selectCategories, selectIsAuthenticated } from './store/selectors';
import { selectOperationModal, selectBurgerModal } from './store/selectors';
import { closeBurgerModal, closeOperationModal, openBurgerModal } from './store/actions/modalActions';
import { fetchUserData } from './store/actions/async/fetchUserData';
import { MainPageLayout } from './pages/MainPage/MainPageLayout';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { LoginWrapper } from './routes/LoginWrapper';
import { ProtectedRoute } from './routes/ProtectedRoute';

export const App = () => {
	const dispatch = useDispatch();
	const operationModal = useSelector(selectOperationModal);
	const burgerModal = useSelector(selectBurgerModal);
	const accountsData = useSelector(selectAccounts);
	const categoriesData = useSelector(selectCategories);
	const isAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch(fetchUserData(user));
		}
	}, [dispatch]);

	const canShowOperationModal = accountsData.length > 0 && categoriesData.length > 0;

	const handleCloseBurgerModal = () => dispatch(closeBurgerModal());
	const handleCloseOperationModal = () => dispatch(closeOperationModal());
	const handleBurgerClick = () => dispatch(openBurgerModal());

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
