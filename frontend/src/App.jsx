import React from 'react';
import { SidebarMenu } from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { TopMenuRow } from './components/TopMenu';
import { CryptoLayout } from './pages/CryptoPage';
import { FinancesLayout } from './pages/FinancesPage';
import { ModalWindowLayout } from './components/modalWindow/ModalWindowLayout';
import { useSelector } from 'react-redux';
import { selectAccounts, selectCategories } from './store/selectors';

function App() {
	const accountsData = useSelector(selectAccounts);
	const categoriesData = useSelector(selectCategories);
	const canShowModal = accountsData.length > 0 && categoriesData.length > 0;
	return (
		<div id="root" className="flex bg-cover w-full overflow-x-hidden min-h-screen p-4">
			{canShowModal && <ModalWindowLayout />}
			<SidebarMenu />
			<div
				id="mainLayout"
				className="flex flex-col flex-15 p-4 backdrop-blur-[40px] bg-cover bg-[rgba(188,217,255,0.05)] rounded-[36px] gap-4 transition-all duration-250 ease-in-out"
			>
				<TopMenuRow />
				<div
					id="pagesLayout"
					className="flex flex-wrap rounded-[36px] h-full gap-4 transition-all duration-250 ease-in-out"
				>
					<Routes>
						<Route path="/" element={'MAIN PAGE'} />
						<Route path="/finances" element={<FinancesLayout />} />
						<Route path="/crypto" element={<CryptoLayout />} />
						<Route path="/*" element={'ERROR PAGE'} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
