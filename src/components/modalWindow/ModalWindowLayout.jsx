import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CardIcon, CurrencyToggle } from '../buttons';
import { selectModalisOpen } from '../../store/selectors/select-modal-is-open';
import { selectModalOnCancel } from '../../store/selectors/select-modal-oncancel';
import { selectModalOnConfirm } from '../../store/selectors/select-modal-onconfirm';
import { accounts, categories } from '../../db';
import { Categorie } from '../pages/FinancesPage/Categories';
import { calculateValueInCurrency } from '../../utils';
import { FinanceAccount } from '../pages/FinancesPage/FinanceAccount/FinanceAccount';
import { OperationItemInModal } from './OperationItemInModal';

export const ModalWindowLayout = ({ isUSD, rubleCourse }) => {
	const [selectedAccountValue, setSelectedAccountValue] = useState(accounts[0].name || null);
	const [selectedCategoryValue, setSelectedCategoryValue] = useState(categories[0].name || null);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalisOpen);

	if (!isOpen) {
		return null;
	}

	const newOperationDate = Date.now;
	const date = new Date(newOperationDate);

	const operationAccount = accounts.filter((item) => item.name === selectedAccountValue);
	const operationCategorie = categories.filter((item) => item.name === selectedCategoryValue);
	console.log('operationCategorie', operationCategorie);

	return (
		<section className="fixed inset-0 z-20 ">
			<div className="absolute w-full h-full bg-gray-950/90 rounded-4xl"></div>
			<div className=" relative w-[48vw] h-[38vh] mx-auto px-8 pt-6 z-30 top-1/2 -translate-y-1/2 bg-sky-950/90 rounded-4xl text-center ">
				<div id="selectors__header__and_buttons" className="flex flex-col justify-between h-full">
					<div className="flex flex-col gap-4 items-center justify-center">
						<h3>ДОБАВИТЬ ОПЕРАЦИЮ</h3>
						<CurrencyToggle />
					</div>
					<div className="flex gap-6 justify-around items-center">
						{selectedAccountValue && (
							<select
								className="bg-gray-100 border text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 w-[40%] p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								value={selectedAccountValue}
								onChange={(e) => setSelectedAccountValue(e.target.value)}
							>
								{accounts.map((account) => {
									return (
										<option
											className="bg-[#334864] border-2 border-[#d1d5db] text-[#daeaff] rounded-lg w-[40%] h-[30px] p-2 transition-all duration-300 ease-in-out hover:bg-[#4b5563] hover:text-white"
											key={account.id}
											value={account.name}
										>
											{account.name}
										</option>
									);
								})}
							</select>
						)}
						{selectedCategoryValue && (
							<select
								className="bg-gray-100 border text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 w-[40%] p-2.5 dark:bg-gray-700 dark:border-gray-400 dark:placeholder-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								value={selectedCategoryValue}
								onChange={(e) => setSelectedCategoryValue(e.target.value)}
							>
								{categories.map((categorie) => {
									return (
										<option
											className="bg-[#334864] border-2 border-[#d1d5db] text-[#daeaff] rounded-lg w-[40%] h-[30px] p-2 transition-all duration-300 ease-in-out hover:bg-[#4b5563] hover:text-white"
											key={categorie.id}
											value={categorie.name}
										>
											{categorie.name}
										</option>
									);
								})}
							</select>
						)}
					</div>
					<section className="flex flex-wrap 2xl:flex-nowrap gap-2 items-center justify-between text-start">
						<FinanceAccount
							accountName={operationAccount[0].name}
							accountBalance={calculateValueInCurrency(
								operationAccount[0].balance,
								isUSD,
								rubleCourse,
							)}
							icon={operationAccount[0].icon}
							noButton={true}
						/>
						<p>{'\u27A0'}</p>
						<Categorie
							noButton={true}
							key={operationCategorie[0].id}
							budget={calculateValueInCurrency(
								operationCategorie[0].budget,
								isUSD,
								rubleCourse,
							)}
							balance={calculateValueInCurrency(
								operationCategorie[0].balance,
								isUSD,
								rubleCourse,
							)}
							categorie={operationCategorie[0].name}
							icon={operationCategorie[0].icon}
						/>
					</section>
					<section
						id="operations__history-item_container"
						className="flex justify-between items-center h-12 w-full text-sm border-b-1 gap-2 bg-lime-500"
					>
						<div className="flex flex-10 justify-between items-center gap-2 bg-amber-700">
							<CardIcon
								buttonSize={9}
								padding={'p-1'}
								size={5}
								icon={operationAccount[0].icon}
							></CardIcon>

							<div className="flex items-center justify-center h-full w-full gap-2 bg-fuchsia-400">
								<div className="flex flex-4 items-center truncate gap-2">
									<span className={`text-sm truncate flex-4`}>
										{operationCategorie[0].name}
									</span>
									{isUSD ? '$ ' : '\u20bd '}

									<input
										name="operation-amount"
										className=" text-sm h-[30px] w-full text-slate-400 flex-3 rounded-lg px-2 border-[1px] border-amber-50/20 bg-amber-300"
										placeholder="Введите сумму"
									></input>
								</div>
								<div className="flex flex-2 truncate bg-blue-900">
									<p className="text-sm w-full truncate text-slate-400">
										{operationAccount[0].name}
									</p>
								</div>
								<div className="flex flex-2 bg-lime-900">
									<input
										name="operation-date"
										className="text-sm h-[30px] w-full text-slate-400  rounded-lg px-2 border-[1px] border-amber-50/20"
										placeholder="Введите дату операции"
									></input>
								</div>
							</div>
						</div>
					</section>

					{/* <section>
						<OperationItemInModal
							isOperationsSection={true}
							operationType={'add'}
							operationComment={'Комментарий'}
							operationAmount={123122323}
							operationDate={date}
						/>
						{/* operationType={operation.type}
								category={operation.category}
								operationComment={operation.comment}
								operationAmount={operation.amount}
								accountName={findAccountName(operation.account_id)}
								operationDate={operation.date} */}
					{/* </section>} */}

					<div className="flex justify-evenly mb-8">
						<Button width="w-42" onClick={onConfirm}>
							Сохранить
						</Button>
						<Button width="w-32" onClick={onCancel}>
							Отмена
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
