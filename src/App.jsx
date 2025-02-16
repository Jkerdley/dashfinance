import React from 'react';
import { SidebarMenu } from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { TopMenuRow } from './components/TopMenu';
import { CryptoLayout } from './components/pages/CryptoPage';
import { FinancesLayout } from './components/pages/FinancesPage';

function App() {
	return (
		<div className="root">
			<SidebarMenu />
			<div className="mainLayout">
				<TopMenuRow />
				<div className="pagesLayout">
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
