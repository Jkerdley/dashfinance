import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '../buttons';
import { selectModalisOpen } from '../../store/selectors/select-modal-is-open';
import { selectModalOnCancel } from '../../store/selectors/select-modal-oncancel';
import { selectModalOnConfirm } from '../../store/selectors/select-modal-onconfirm';
import { accounts, categories } from '../../db';
import { Categorie } from '../pages/FinancesPage/Categories';
import { calculateValueInCurrency } from '../../utils';
import { FinanceAccount } from '../pages/FinancesPage/FinanceAccount/FinanceAccount';

export const ModalWindowLayout = ({ isUSD, rubleCourse }) => {
	const [selectedAccountValue, setSelectedAccountValue] = useState('Tinkoff VISA credit card');
	const [selectedCategoryValue, setSelectedCategoryValue] = useState('Продукты');
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalisOpen);

	if (!isOpen) {
		return null;
	}

	const operationAccount = accounts.filter((item) => item.name === selectedAccountValue);
	const operationCategorie = categories.filter((item) => item.name === selectedCategoryValue);
	console.log('operationCategorie', operationCategorie);

	return (
		<section className="fixed inset-0 z-20 ">
			<div className="absolute w-full h-full bg-gray-950/90 rounded-4xl"></div>

			<div className=" relative w-[45vw] h-[30vh] mx-auto px-2 pt-4 z-30 top-1/2 -translate-y-1/2 bg-sky-950/90 rounded-4xl text-center ">
				<div id="selectors__header__and_buttons" className="flex flex-col justify-between h-full">
					<h3>ДОБАВИТЬ ОПЕРАЦИЮ</h3>
					<div className="flex gap-6 justify-around items-center">
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
					</div>
					<section className="flex flex-wrap 2xl:flex-nowrap gap-2 items-center justify-between text-start">
						<FinanceAccount
							accountName={operationAccount[0].name}
							accountBalance={operationAccount[0].balance}
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
