import React from 'react';
import styles from './styles/FinancesLayout.module.css';
import SettingsIcon from '../../../assets/icons/settings-icon.svg';
import { WideOperationsButton } from '../../buttons/WideOperationsButton';
import { FinanceAccount } from './FinanceAccount';
import OutlineButton from '../../buttons/OutlineButton';
import { OperationHistory } from './OperationHistory';
import { Categorie } from './Categories';

let operations = [
	{
		id: '822e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'spend',
		amount: 10234.23,
		date: '12.02.2025',
		comment: 'Сметана, молоко, сыр косичка',
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
		account_id: '0006',
		icon: 'house',
		type: 'spend',
		amount: 4234.23,
		date: '15.01.2025',
		comment: '',
	},
	{
		id: '823e',
		category: 'Зарплата',
		account_id: '0005',
		icon: 'cash',
		type: 'add',
		amount: 120234.45,
		date: '13.01.2025',
		comment: 'Халтурка',
	},
	{
		id: '824e',
		category: 'ЖКХ',
		account_id: '0007',
		icon: 'house',
		type: 'spend',
		amount: 20234.23,
		date: '22.01.2025',
		comment: '',
	},
	{
		id: '825e',
		category: 'Инвестиции',
		account_id: '0008',
		icon: 'investments',
		type: 'add',
		amount: 312234.12,
		date: '12.01.2025',
		comment: '',
	},
	{
		id: '826e',
		category: 'Продукты',
		account_id: '0009',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '843e',
		category: 'Продукты',
		account_id: '0010',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
	{
		id: '806e',
		category: 'Продукты',
		account_id: '0001',
		icon: 'products',
		type: 'add',
		amount: 20234.23,
		date: '02.01.2025',
		comment: '',
	},
];

let categories = [
	{ id: '0124', name: 'Продукты', budget: '50000', balance: '22134.12', icon: 'credit' },
	{ id: '0125', name: 'БытХим', budget: '10000', balance: '12134.12', icon: 'debit' },
	{ id: '0126', name: 'ЖКХ', budget: '5000', balance: '5300', icon: 'debit' },
	{ id: '0127', name: 'Развлечения', budget: '50000', balance: '22134.12', icon: 'debit' },
	{ id: '0128', name: 'Семья', budget: '50000', balance: '22134.12', icon: 'debit' },
	{ id: '0130', name: 'Вредные привычки', budget: '50000', balance: '22134.12', icon: 'debit' },
	{ id: '0131', name: 'Кафе', budget: '50000', balance: '22134.12', icon: 'debit' },
	{ id: '0132', name: 'Досуг', budget: '10000', balance: '11000', icon: 'debit' },
	{ id: '0133', name: 'Подарки', budget: '', balance: '17004.81', icon: 'debit' },
];
const findAccountName = (accountId) => {
	const account = accounts.find((accountItem) => accountId === accountItem.id);
	return account ? account.name : null;
};
let accounts = [
	{ id: '0001', name: 'SBER Bank VISA', balance: '36000,12', icon: 'credit', type: 'debit' },
	{ id: '0002', name: 'Tinkoff VISA credit card', balance: '50000', icon: 'credit', type: 'credit' },
	{ id: '0003', name: 'Наличные', balance: '552000', icon: 'cash', type: 'cash' },
	{ id: '0004', name: 'Alfa Bank debit', balance: '50000', icon: 'debit', type: 'debit' },
	{
		id: '0005',
		name: 'Tinkoff black MasterCard debit card',
		balance: '50000',
		icon: 'debit',
		type: 'debit',
	},
	{ id: '0006', name: 'Alfa bank debit', balance: '50000', icon: 'debit', type: 'debit' },
	{ id: '0007', name: 'Tinkoff platinum credit', balance: '1513000,72', icon: 'credit', type: 'credit' },
	{ id: '0008', name: 'Alfa Bank credit', balance: '50000', icon: 'credit', type: 'credit' },
	{ id: '0009', name: 'SBER Bank MIR', balance: '3214000', icon: 'debit', type: 'debit' },
	{ id: '0010', name: 'Gift Card', balance: '50000', icon: 'gift', type: 'debit' },
];
export const FinancesLayout = () => {
	return (
		<>
			<div className={styles.financeLayout}>
				<div className={styles.leftColumn}>
					<div className={styles.columnFinanceResult}>Финансовый результат</div>
					<div className={styles.rowAccountsAndOperations}>
						<div className={styles.operationsAccountsWrapper}>
							<div className={styles.operations}>
								<div className={styles.boxFinanceOperations}>
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
											<p className="text-lg">Расходы - </p>
										</WideOperationsButton>
									</div>
								</div>
							</div>
							<div className={styles.accounts}>
								Счета
								<div className={styles.accountsWrapper}>
									{accounts.map((account) => {
										return (
											<div key={account.id}>
												<FinanceAccount
													accountName={account.name}
													accountBalance={account.balance}
													icon={account.icon}
												/>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className={styles.columnOperationHistory}>
							<div className="flex justify-between gap-2">
								История операций
								<OutlineButton disabled={true} icon={SettingsIcon} alt="change payments">
									<p className="text-lg">Изменить</p>
								</OutlineButton>
							</div>
							<div className={styles.operationsHistoryBoxWrapper}>
								{operations.map((operation) => {
									console.log('operation.account_id', operation.account_id);

									return (
										<div key={operation.id}>
											<OperationHistory
												operationType={operation.type}
												category={operation.category}
												operationComment={operation.comment}
												operationAmount={operation.amount}
												accountName={findAccountName(operation.account_id)}
												operationDate={operation.date}
											/>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				<div className={styles.rightColumn}>
					<div className={styles.columnCategories}>
						<div className="flex mb-2">Категории расходов</div>

						<div className={styles.spendCategories}>
							{categories.map((categorie) => {
								return (
									<Categorie
										key={categorie.id}
										budget={categorie.budget}
										balance={categorie.balance}
										categorie={categorie.name}
										icon={categorie.icon}
									/>
								);
							})}
						</div>
					</div>
					<div className={styles.columnIncomeChart}>Доходы график</div>
				</div>
			</div>
		</>
	);
};
