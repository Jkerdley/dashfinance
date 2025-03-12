import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { SidebarMenu } from './components/Sidebar';
import { TopMenuRow } from './components/TopMenu';
import { BurgerMenuModal, AddOperationModal } from './components/modalWindow';
import { CryptoLayout } from './pages/CryptoPage';
import { FinancesLayout } from './pages/FinancesPage/';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { selectAccounts, selectCategories, selectIsAuthenticated } from './store/selectors';
import { selectOperationModal, selectBurgerModal } from './store/selectors';
import { closeBurgerModal, closeOperationModal, openBurgerModal } from './store/actions/modalActions';
import { fetchUserData } from './store/actions/fetchUserData';
import { MainPageLayout } from './pages/MainPage/MainPageLayout';

const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	return isAuthenticated ? children : null;
};

const PublicRoute = ({ children }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return !isAuthenticated ? children : null;
};

export const App = () => {
	const dispatch = useDispatch();
	const operationModal = useSelector(selectOperationModal);
	const burgerModal = useSelector(selectBurgerModal);
	const accountsData = useSelector(selectAccounts);
	const categoriesData = useSelector(selectCategories);

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
						<PublicRoute>
							<LoginPage />
						</PublicRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<PublicRoute>
							<RegisterPage />
						</PublicRoute>
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
											<Route path="/*" element={<Navigate to="/" replace />} />
										</Routes>
									</div>
								</div>
							</>
						</ProtectedRoute>
					}
				/>
			</Routes>
		</section>
	);
};
