// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Route, Routes } from 'react-router-dom';
// import { SidebarMenu } from './components/Sidebar';
// import { TopMenuRow } from './components/TopMenu';
// import { BurgerMenuModal, AddOperationModal } from './components/modalWindow';
// import { CryptoLayout } from './pages/CryptoPage';
// import { FinancesLayout } from './pages/FinancesPage/';
// import { selectAccounts, selectCategories } from './store/selectors';
// import { selectOperationModal, selectBurgerModal } from './store/selectors';
// import { closeBurgerModal, closeOperationModal, openBurgerModal } from './store/actions/modalActions';

// export const App = () => {
// 	const dispatch = useDispatch();
// 	const operationModal = useSelector(selectOperationModal);
// 	const burgerModal = useSelector(selectBurgerModal);
// 	const accountsData = useSelector(selectAccounts);
// 	const categoriesData = useSelector(selectCategories);

// 	const canShowOperationModal = accountsData.length > 0 && categoriesData.length > 0;

// 	const handleCloseBurgerModal = () => {
// 		dispatch(closeBurgerModal());
// 	};

// 	const handleCloseOperationModal = () => {
// 		dispatch(closeOperationModal());
// 	};

// 	const handleBurgerClick = () => {
// 		dispatch(openBurgerModal());
// 	};

// 	return (
// 		<div id="root" className="flex bg-cover w-full overflow-x-hidden min-h-screen p-4">
// 			<BurgerMenuModal isOpen={burgerModal.isOpen} onClose={handleCloseBurgerModal} />

// 			{canShowOperationModal && (
// 				<AddOperationModal
// 					isOpen={operationModal.isOpen}
// 					operationType={operationModal.type}
// 					onClose={handleCloseOperationModal}
// 				/>
// 			)}

// 			<SidebarMenu />
// 			<div id="mainLayout" className="flex flex-col flex-15 p-4 gap-4 rounded-4xl bg-sky-300/5 ">
// 				<TopMenuRow onBurgerClick={handleBurgerClick} isBurgerMenuOpen={burgerModal.isOpen} />
// 				<div id="pagesLayout" className="flex flex-wrap rounded-[36px] h-full gap-4">
// 					<Routes>
// 						<Route path="/" element={'MAIN PAGE'} />
// 						<Route path="/finances" element={<FinancesLayout />} />
// 						<Route path="/crypto" element={<CryptoLayout />} />
// 						<Route path="/*" element={'ERROR PAGE'} />
// 					</Routes>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { SidebarMenu } from './components/Sidebar';
import { TopMenuRow } from './components/TopMenu';
import { BurgerMenuModal, AddOperationModal } from './components/modalWindow';
import { CryptoLayout } from './pages/CryptoPage';
import { FinancesLayout } from './pages/FinancesPage/';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { selectAccounts, selectCategories } from './store/selectors';
import { selectOperationModal, selectBurgerModal } from './store/selectors';
import { closeBurgerModal, closeOperationModal, openBurgerModal } from './store/actions/modalActions';

export const App = () => {
	const dispatch = useDispatch();
	const operationModal = useSelector(selectOperationModal);
	const burgerModal = useSelector(selectBurgerModal);
	const accountsData = useSelector(selectAccounts);
	const categoriesData = useSelector(selectCategories);

	const canShowOperationModal = accountsData.length > 0 && categoriesData.length > 0;

	const handleCloseBurgerModal = () => {
		dispatch(closeBurgerModal());
	};

	const handleCloseOperationModal = () => {
		dispatch(closeOperationModal());
	};

	const handleBurgerClick = () => {
		dispatch(openBurgerModal());
	};

	const isAuthenticated = !!localStorage.getItem('token');

	return (
		<section id="root" className="flex bg-cover w-full overflow-x-hidden min-h-screen p-4">
			{isAuthenticated && (
				<>
					<BurgerMenuModal isOpen={burgerModal.isOpen} onClose={handleCloseBurgerModal} />

					{canShowOperationModal && (
						<AddOperationModal
							isOpen={operationModal.isOpen}
							operationType={operationModal.type}
							onClose={handleCloseOperationModal}
						/>
					)}

					<SidebarMenu />
					<div
						id="mainLayout"
						className="flex flex-col flex-15 p-4 gap-4 rounded-4xl bg-sky-300/5 "
					>
						<TopMenuRow onBurgerClick={handleBurgerClick} isBurgerMenuOpen={burgerModal.isOpen} />
						<div id="pagesLayout" className="flex flex-wrap rounded-[36px] h-full gap-4">
							<Routes>
								<Route path="/" element={'Главная страница'} />
								{/* <Route path="/" element={<Navigate to="/finances" />} /> */}
								<Route path="/finances" element={<FinancesLayout />} />
								<Route path="/crypto" element={<CryptoLayout />} />
								<Route path="/*" element={'ERROR PAGE'} />
							</Routes>
						</div>
					</div>
				</>
			)}

			{!isAuthenticated && (
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/*" element={<Navigate to="/login" />} />
				</Routes>
			)}
		</section>
	);
};
