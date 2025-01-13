import React from 'react';
import './styles/Layout.css';
import { SidebarMenu } from '../Sidebar';
import { TopMenuRow } from '../TopMenu/TopMenuRow';
import SettingsIcon from '../../assets/icons/settings-icon.svg';
import { WideOperationsButton } from '../buttons/WideOperationsButton';
import { FinanceAccount } from '../financeAccount/financeAccount';
import { OperationHistory } from '../operationHistory/OperationHistory';
import OutlineButton from '../buttons/OutlineButton';

let operations = [
	{
		id: '822e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'spend',
		amount: 10234.23,
		date: '12.02.2025',
		comment: '',
	},
	{
		id: '813e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'spend',
		amount: 21234.23,
		date: '11.12.2025',
		comment: '',
	},
	{
		id: '812e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'spend',
		amount: 13234.23,
		date: '16.01.2025',
		comment: '',
	},
	{
		id: '821e',
		category: 'БытХим',
		account_id: '0001',
		icon: 'house',
		type: 'spend',
		amount: 4234.23,
		date: '15.01.2025',
		comment: '',
	},
	{
		id: '823e',
		category: 'Зарплата',
		account_id: '0001',
		icon: 'cash',
		type: 'add',
		amount: 120234.45,
		date: '13.01.2025',
		comment: '',
	},
	{
		id: '824e',
		category: 'ЖКХ',
		account_id: '0001',
		icon: 'house',
		type: 'spend',
		amount: 20234.23,
		date: '22.01.2025',
		comment: '',
	},
	{
		id: '825e',
		category: 'Инвестиции',
		account_id: '0002',
		icon: 'investments',
		type: 'add',
		amount: 312234.12,
		date: '12.01.2025',
		comment: '',
	},
	{
		id: '826e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '826e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '826e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
];

export const Layout = () => {
	return (
		<>
			<SidebarMenu />
			<div className="main-layout">
				<TopMenuRow />
				<div className="finance-layout">
					<div className="left-column">
						<div className="column-finance-result">Финансовый результат</div>
						<div className="row-accounts-and-operations">
							<div className="operations-accounts-wrapper">
								<div className="operations">
									<div className="box-finance-operations">
										<p>Операции</p>
										<div className="flex gap-4 justify-between items-center">
											<WideOperationsButton icon={SettingsIcon} alt="income">
												<p className="text-lg">Доходы +</p>
											</WideOperationsButton>
											<WideOperationsButton
												icon={SettingsIcon}
												color={'outcome'}
												alt="income"
											>
												<p className="text-lg">Доходы +</p>
											</WideOperationsButton>
										</div>
									</div>
								</div>
								<div className="accounts">
									Счета
									<div className="accounts-wrapper">
										{/*TODO financeAccounts.map((account) => { return <FinanceAccount name={account.name} balance={account.balance}  />}) */}
										<FinanceAccount
											accountName={'accountName'}
											accountBalance={'accountBalance'}
											icon={'debit'}
										/>
										<FinanceAccount
											accountName={'accountName'}
											accountBalance={'accountBalance'}
											icon={'cash'}
										/>
										<FinanceAccount
											accountName={
												'accountName ass sssssssssssssss fffffffffff fffffffff'
											}
											accountBalance={'accountBalance'}
											icon={'credit'}
										/>
										<FinanceAccount
											accountName={'accountName'}
											accountBalance={'accountBalance'}
											icon={'debit'}
										/>
										<FinanceAccount
											accountName={'accountName'}
											accountBalance={'accountBalance'}
											icon={'credit'}
										/>
										<FinanceAccount
											accountName={'accountName'}
											accountBalance={'accountBalanc'}
											icon={'debit'}
										/>
									</div>
								</div>
							</div>
							<div className="column-operation-history">
								<div className="flex justify-between gap-2">
									История операций
									<OutlineButton disabled={true} icon={SettingsIcon} alt="change payments">
										<p className="text-lg">Изменить</p>
									</OutlineButton>
								</div>
								<div className="operations-history-box-wrapper">
									{operations.map((operation) => {
										return (
											<div key={operation.id}>
												<OperationHistory
													operationType={operation.type}
													category={operation.category}
													operationComment={''}
													operationAmount={operation.amount}
													accountName={operation.account_id}
													operationDate={operation.date}
												/>
											</div>
										);
									})}
									{/* <OperationHistory
										addOperation={true}
										operationType={'Пополнение счета'}
										operationComment={''}
										summOfOperation={1045.34}
										accountName={'SBER Credit card'}
										operationDate={'12.11.2024'}
									/> */}
								</div>
							</div>
						</div>
					</div>

					<div className="right-column">
						<div className="column-categories">Категории расходов</div>
						<div className="column-income-chart">Доходы график</div>
					</div>
				</div>
			</div>
		</>
	);
};
