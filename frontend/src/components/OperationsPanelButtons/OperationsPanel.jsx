import React, { useCallback } from 'react';
import { WideOperationsButton } from '../buttons';
import { SectionContainerHeader } from '../SectionContainerHeader/SectionContainerHeader';
import { closeModal, openModal } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccounts, selectCategories } from '../../store/selectors';

export const OperationsPanel = ({ onCryptoClick, isCrypto }) => {
	const dispatch = useDispatch();
	const accounts = useSelector(selectAccounts);
	const categories = useSelector(selectCategories);

	const canOpenModal = accounts.length > 0 && categories.length > 0;

	const handleOperationsClick = useCallback(() => {
		if (!canOpenModal) {
			alert('Сначала необходимо добавить счета и категории расходов');
			return;
		}

		dispatch(
			openModal({
				question: 'Добавить операцию?',
				onConfirm: () => {
					dispatch(closeModal());
					// Здесь добавить логику для сохранения операции
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	}, [canOpenModal, dispatch]);

	return isCrypto ? (
		<div id="operations__buttons" className="flex flex-col mt-4 items-start gap-4">
			<div className="flex gap-4 w-full justify-between items-center">
				<WideOperationsButton
					onClick={handleOperationsClick}
					color={'bg-main-green'}
					alt="income"
					disabled={!canOpenModal}
				>
					<span className="text-lg font-semibold">Покупка +</span>
				</WideOperationsButton>
				<WideOperationsButton
					onClick={handleOperationsClick}
					color={'bg-main-red'}
					alt="expenses"
					disabled={!canOpenModal}
				>
					<span className="text-lg font-semibold">Продажа - </span>
				</WideOperationsButton>
			</div>
		</div>
	) : (
		<div id="operations__container" className="flex flex-col flex-1 p-4 rounded-[26px] bg-sky-950/40">
			<div id="operations__buttons" className="flex items-start flex-col gap-4">
				<SectionContainerHeader title={'Операции'} />
				<div className="flex gap-4 w-full justify-between items-center">
					<WideOperationsButton
						onClick={handleOperationsClick}
						color={'bg-main-green'}
						alt="income"
						disabled={!canOpenModal}
					>
						<span className="text-lg font-semibold">Доходы +</span>
					</WideOperationsButton>
					<WideOperationsButton
						onClick={handleOperationsClick}
						color={'bg-main-red'}
						alt="expenses"
						disabled={!canOpenModal}
					>
						<span className="text-lg font-semibold">Расходы - </span>
					</WideOperationsButton>
				</div>
			</div>
		</div>
	);
};
