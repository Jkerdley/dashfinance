import React from 'react';
import styles from './styles/CryptoLayout.module.css';
import SettingsIcon from '../../../assets/icons/settings-icon.svg';
import { WideOperationsButton } from '../../buttons/WideOperationsButton';
import { FinanceAccount } from './FinanceAccount';
import OutlineButton from '../../buttons/OutlineButton';
import { OperationHistory } from './OperationHistory';

export const CryptoLayout = () => {
	return (
		<>
			<div className={styles.cryptoLayout}>
				<div className={styles.leftColumn}>
					<div className={styles.columnFinanceResult}>Крипто портфель</div>
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
											<p className="text-lg">Доходы +</p>
										</WideOperationsButton>
									</div>
								</div>
							</div>
							<div className={styles.accounts}>
								Счета
								<div className={styles.accountsWrapper}>
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
										accountName={'accountName ass sssssssssssssss fffffffffff fffffffff'}
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
						<div className={styles.columnOperationHistory}>
							<div className="flex justify-between gap-2">
								История операций
								<OutlineButton disabled={true} icon={SettingsIcon} alt="change payments">
									<p className="text-lg">Изменить</p>
								</OutlineButton>
							</div>
							<div className={styles.operationsHistoryBoxWrapper}>
								{/* {operations.map((operation) => {
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
								})} */}
								<OperationHistory
									addOperation={true}
									operationType={'Пополнение счета'}
									operationComment={''}
									summOfOperation={1045.34}
									accountName={'SBER Credit card'}
									operationDate={'12.11.2024'}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.rightColumn}>
					<div className={styles.columnCategories}>Категории расходов</div>
					<div className={styles.columnIncomeChart}>Доходы график</div>
				</div>
			</div>
		</>
	);
};
