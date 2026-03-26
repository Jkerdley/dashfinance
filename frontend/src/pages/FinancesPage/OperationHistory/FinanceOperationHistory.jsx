import React from 'react';
import BancCardIcon from '../../../assets/icons/income-debit-icon.svg';
import { CardIcon } from '../../../components/CardIcon';
import { OptionsButton } from '../../../components/buttons';
import { useDeleteHistoryMutation } from '../../../store/api/backendApi';
import { OPERATION_TYPES } from '../../../constants/operations';

const formatDate = (dateString) => dateString.split('-').reverse().join('.');

export const FinanceOperationHistory = ({
	id,
	category,
	operationType,
	operationAmount,
	accountName,
	operationDate,
}) => {
	const isAdd = operationType === OPERATION_TYPES.INCOME;
	const amountColorClass = isAdd ? 'text-main-green' : 'text-main-red';
	const amountPrefix = isAdd ? '+' : '-';

	const [deleteHistory, { isLoading: isDeleting }] = useDeleteHistoryMutation();

	const handleDelete = async () => {
		if (window.confirm('Удалить эту операцию?')) {
			try {
				await deleteHistory(id).unwrap();
			} catch (error) {
				console.error('Ошибка при удалении операции:', error);
			}
		}
	};

	return (
		<div
			id={`operation-${id}`}
			className="flex justify-between items-start h-16 w-full pt-3 text-sm border-b-1 border-white/40 overflow-hidden"
		>
			<div className="flex flex-grow items-center gap-2 max-w-full overflow-hidden">
				<CardIcon buttonSize={9} padding={'p-1.5'} size={5} icon={BancCardIcon} />

				<div className="flex items-center w-full gap-2 overflow-hidden">
					<div className="flex-shrink-0 flex-grow w-1/4">
						<span className="text-sm text-white truncate block">{category}</span>
					</div>

					<div className="flex-shrink-0 flex-grow w-1/4">
						<span className={`text-sm ${amountColorClass} truncate block`}>
							{amountPrefix}
							{operationAmount}
						</span>
					</div>

					<div className="lg:block hidden flex-shrink-0 flex-grow w-1/4">
						<span className="text-sm text-slate-400 truncate block">{accountName}</span>
					</div>

					<div className="sm:flex hidden flex-shrink-0 flex-grow w-1/4 text-start">
						<span className="text-sm text-slate-400 truncate block">
							{formatDate(operationDate)}
						</span>
					</div>
				</div>
			</div>

			<OptionsButton
				deleteIcon={true}
				onClick={handleDelete}
				flex={'flex-shrink-0'}
				disabled={isDeleting}
			/>
		</div>
	);
};
