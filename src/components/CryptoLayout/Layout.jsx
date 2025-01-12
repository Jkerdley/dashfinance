import React from 'react';
import './styles/Layout.css';
import { SidebarMenu } from '../Sidebar';
import { TopMenuRow } from '../TopMenu/TopMenuRow';
import Icon from '../../assets/icons/bell-icon.svg';
import { WideOperationsButton } from '../buttons/WideOperationsButton';
import { FinanceAccount } from '../financeAccount/financeAccount';
import { OperationHistory } from '../operationHistory/OperationHistory';

export const Layout = () => {
	return (
		<>
			<SidebarMenu />
			<div className="layout">
				<TopMenuRow />
				<div className="financeLayout">
					<div className="right-column"></div>
					<div className="left-column"></div>
					<div className="main-row-top">
						<div className="column-top-left">Финансовый результат</div>
						<div className="column-top-right">Категории расходов</div>
					</div>
					<div className="main-row-bottom">
						<div className="column-bottom-left">
							<div className="column-bottom-left-top">
								<div className="flex flex-col gap-8">
									<p>Операции</p>
									<div className="flex gap-4 justify-between items-center">
										<WideOperationsButton icon={Icon} alt="income">
											<p className="text-lg">Доходы +</p>
										</WideOperationsButton>
										<WideOperationsButton color={'outcome'} icon={Icon} alt="outcome">
											<p className="text-lg">Расходы -</p>
										</WideOperationsButton>
									</div>
								</div>
							</div>
							<div className="column-bottom-left-bottom">
								Счета
								{/*TODO financeAccounts.map((account) => { return <FinanceAccount name={account.name} balance={account.balance}  />}) */}
								<FinanceAccount />
								<FinanceAccount />
								<FinanceAccount />
								<FinanceAccount />
							</div>
						</div>
						<div className="column-bottom-middle">
							История операций
							<OperationHistory
								addOperation={true}
								operationType={'Пополнение счета sasdas sasdas'}
								operationComment={''}
								summOfOperation={1045.34}
								accountName={'SBER Credit card'}
								operationDate={'12.11.2024'}
							/>
							<OperationHistory
								addOperation={false}
								operationType={'Продукты'}
								operationComment={''}
								summOfOperation={10213245.34}
								accountName={'SBER Credit card name'}
								operationDate={'24.01.2025'}
							/>
						</div>
						<div className="column-bottom-right">Доходы график</div>
					</div>
				</div>
			</div>
		</>
	);
};
