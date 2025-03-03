import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CloseModalButton, CurrencyToggle } from '../buttons';
import { CardIcon } from '../CardIcon';
import { selectModalisOpen } from '../../store/selectors/select-modal-is-open';
import { selectModalOnCancel } from '../../store/selectors/select-modal-oncancel';
import { selectModalOnConfirm } from '../../store/selectors/select-modal-onconfirm';
import { Categorie } from '../../pages/FinancesPage/Categories';
import { getIconOfCategorie } from '../../utils';
import { FinanceAccount } from '../../pages/FinancesPage/FinanceAccount/FinanceAccount';
import { useEffect } from 'react';
import { usePressKey } from '../../hooks/usePressKey';
import { useCurrency, useFetchAccountsInCurrency, useFetchCategoriesInCurrency } from '../../hooks';

export const ModalWindowLayout = () => {
	const { isUSD, rubleCourse } = useCurrency();
	const { accountsInCurrency, isLoading } = useFetchAccountsInCurrency();
	const { categoriesInCurrency, categoriesIsLoading } = useFetchCategoriesInCurrency();
	const [operationDate, setOperationDate] = useState('');
	const [operationSumm, setOperationSumm] = useState('');
	const [selectedAccountValue, setSelectedAccountValue] = useState('');
	const [selectedCategoryValue, setSelectedCategoryValue] = useState('');
	const modalRef = useRef(null);
	const escButtonPressed = usePressKey('Escape');

	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalisOpen);

	const handleDateChange = (e) => {
		setOperationDate(e.target.value);
	};

	const handleSummChange = (e) => {
		setOperationSumm(Number(e.target.value));
	};

	const handleFormSubmit = useCallback(
		(event) => {
			event.preventDefault();
			if (!operationSumm) {
				alert('Введите сумму операции');
				return;
			}

			if (operationSumm < 0) {
				alert('Сумма должна быть больше нуля');
				return;
			}

			const summInUSD = isUSD ? operationSumm * rubleCourse : operationSumm;

			console.log('Submit FORM DATA', {
				tag: 'finance',
				category: selectedCategoryValue,
				categoryId: '0125',
				account: selectedAccountValue,
				accountId: '0001',
				icon: 'products',
				type: 'add',
				summ: summInUSD,
				date: operationDate,
				comment: '',
			});
			resetForm();
			onCancel();
		},
		[
			operationSumm,
			isUSD,
			rubleCourse,
			selectedCategoryValue,
			selectedAccountValue,
			operationDate,
			onCancel,
		],
	);

	const resetForm = useCallback(() => {
		setOperationSumm('');
		setSelectedAccountValue(accountsInCurrency[0]?.name || '');
		setSelectedCategoryValue(categoriesInCurrency[0]?.name || '');
	}, [accountsInCurrency, categoriesInCurrency]);

	useEffect(() => {
		if (accountsInCurrency.length > 0 && !isLoading) {
			setSelectedAccountValue(accountsInCurrency[0].name);
		}
	}, [accountsInCurrency, isLoading]);

	useEffect(() => {
		if (categoriesInCurrency.length > 0 && !categoriesIsLoading) {
			setSelectedCategoryValue(categoriesInCurrency[0].name);
		}
	}, [categoriesInCurrency, categoriesIsLoading]);

	useEffect(() => {
		const today = new Date();
		const dateInFormat = today.toISOString().split('T')[0];
		setOperationDate(dateInFormat);
	}, []);

	useEffect(() => {
		isOpen && modalRef.current && modalRef.current.focus();
	}, [isOpen]);

	useEffect(() => {
		if (escButtonPressed && isOpen) {
			onCancel();
		}
	}, [escButtonPressed, isOpen, onCancel]);

	if (!isOpen || isLoading || categoriesIsLoading) {
		return null;
	}

	if (accountsInCurrency.length === 0 || categoriesInCurrency.length === 0) {
		onCancel();
		alert('Сначала необходимо добавить счета и категории расходов');
		return null;
	}
	const operationAccount = accountsInCurrency.filter((item) => item.name === selectedAccountValue);
	const operationCategorie = categoriesInCurrency.filter((item) => item.name === selectedCategoryValue);

	return (
		<section className="fixed inset-0 z-20">
			<div className="absolute w-full h-full bg-gray-950/90 rounded-4xl"></div>

			<div
				ref={modalRef}
				tabIndex="-1"
				id="modal__container"
				className="relative w-[48vw] h-[48vh] mx-auto px-8 pt-6 z-30 top-1/2 -translate-y-1/2 bg-sky-950/90 rounded-4xl text-center"
			>
				<CloseModalButton onClick={onCancel} />
				<div id="selectors__header__and_buttons" className="flex flex-col justify-between h-full">
					<div className="flex flex-col gap-4 items-center justify-center">
						<h3>ДОБАВИТЬ ОПЕРАЦИЮ</h3>
						<CurrencyToggle />
					</div>
					<div className="flex gap-6 justify-around items-center">
						{selectedAccountValue && (
							<select
								className="text-sm rounded-xl w-[40%] p-2 bg-sky-900/50"
								value={selectedAccountValue}
								onChange={(e) => setSelectedAccountValue(e.target.value)}
							>
								{accountsInCurrency.map((account) => {
									return (
										<option
											className="bg-[#334864] text-[#daeaff] rounded-lg w-[40%] h-[30px] p-2 transition-all duration-300 ease-in-out hover:bg-[#4b5563] hover:text-white"
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
								className="text-sm rounded-xl w-[40%] p-2 bg-sky-900/50"
								value={selectedCategoryValue}
								onChange={(e) => setSelectedCategoryValue(e.target.value)}
							>
								{categoriesInCurrency.map((categorie) => {
									return (
										<option
											className="bg-[#334864] text-[#daeaff] rounded-lg w-[40%] h-[30px] p-2 transition-all duration-300 ease-in-out hover:bg-[#4b5563] hover:text-white"
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
					<section className="flex flex-wrap 2xl:flex-nowrap gap-4 items-center justify-between text-start">
						<FinanceAccount
							accountName={selectedAccountValue}
							accountBalance={operationAccount[0].balance}
							icon={operationAccount[0].icon}
							noButton={true}
						/>
						<p>{'\u27A0'}</p>
						<Categorie
							noButton={true}
							budget={operationCategorie[0].budget}
							balance={operationCategorie[0].balance}
							categorie={selectedCategoryValue}
							icon={operationCategorie[0].icon}
						/>
					</section>

					<section
						id="operations__history-item_container"
						className="flex justify-between items-center h-18 w-full text-sm border-b-1 border-white/30 gap-2"
					>
						<div className="flex flex-3 items-center truncate gap-2">
							<CardIcon
								buttonSize={9}
								padding={'p-1'}
								size={5}
								icon={getIconOfCategorie(operationAccount[0].icon)}
							/>
							<span className={`text-sm truncate`}>{selectedCategoryValue}</span>
						</div>
						{isUSD ? '$ ' : '\u20bd '}
						<form onSubmit={handleFormSubmit} className="flex flex-8 gap-4">
							<input
								name="operation-amount"
								type="number"
								className="text-sm h-[30px] w-full flex-2 rounded-lg px-2 border-[1px] border-sky-100/60"
								placeholder="Введите сумму"
								value={operationSumm}
								onChange={handleSummChange}
							/>
							<input
								name="operation-date"
								type="date"
								className="text-sm h-[30px] w-full text-slate-400 flex-2 rounded-lg px-2 border-[1px] border-sky-100/60"
								value={operationDate}
								onChange={handleDateChange}
							/>
							<button type="submit" className="hidden">
								сохранить
							</button>
						</form>
						<div className="flex flex-4 truncate">
							<p className="text-sm w-full truncate text-white/90">
								{accountsInCurrency.find((acc) => acc.name === selectedAccountValue).name}
							</p>
						</div>
					</section>
					<div id="save-and-cancel__buttons" className="flex justify-evenly mb-8">
						<Button width="w-42" type="submit" onClick={handleFormSubmit}>
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
