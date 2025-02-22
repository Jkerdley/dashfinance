import React from 'react';
import { SidebarMenu } from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { TopMenuRow } from './components/TopMenu';
import { CryptoLayout } from './components/pages/CryptoPage';
import { FinancesLayout } from './components/pages/FinancesPage';

function App() {
	return (
		<div id="root" className="flex bg-cover w-full overflow-x-hidden min-h-screen p-4">
			<SidebarMenu />
			<div
				id="mainLayout"
				className="flex flex-col flex-15 p-4 backdrop-blur-[40px] bg-cover bg-[rgba(239,239,239,0.08)] rounded-[36px] gap-4 transition-all duration-250 ease-in-out"
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
