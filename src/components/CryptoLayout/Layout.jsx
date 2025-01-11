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
					<div className="column-top-left"></div>
					<div className="column-top-right"></div>
				</div>
				<div className="main-row-bottom">
					<div className="column-bottom-left">
						<div className="column-bottom-left-top"></div>
						<div className="column-bottom-left-bottom"></div>
					</div>
					<div className="column-bottom-middle"></div>
					<div className="column-bottom-right"></div>
				</div>
			</div>
		</>
	);
};
