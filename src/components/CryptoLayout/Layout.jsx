import React from 'react';
import './styles/Layout.css';
import { SidebarMenu } from '../Sidebar';
import { TopMenuRow } from '../TopMenu/TopMenuRow';

export const Layout = () => {
	return (
		<>
			<SidebarMenu />
			<div className="layout">
				<TopMenuRow />
				<div className="main-row-top">
					<div className="column column-top-left"></div>
					<div className="column column-top-right"></div>
				</div>
				<div className="main-row-bottom">
					<div className="column column-bottom-left">
						<div className="column column-bottom-center-top"></div>
						<div className="column column-bottom-center-bottom"></div>
					</div>
					<div className="column column-bottom-middle"></div>
					<div className="column column-bottom-right"></div>
				</div>
			</div>
		</>
	);
};
