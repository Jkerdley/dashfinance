import React from 'react';
import { CardIcon } from '../buttons/CardIcon';
import Settings from '../../assets/icons/settings-icon.svg';
import BancCardIcon from '../../assets/icons/income-cash-icon.svg';

export const FinanceAccount = () => {
	return (
		<div className="flex justify-start items-center h-14 w-[100%] mt-4 p-2 text-sm bg-sky-300/20 rounded-2xl gap-2">
			<div className="flex flex-[7] justify-start items-center gap-3">
				<CardIcon icon={BancCardIcon}></CardIcon>
				<div className="flex flex-col ">
					<p className="text-base">SBER Credit card</p>
					<p className="text-sm">Баланс:{/* TODO cardBalance */}</p>
				</div>
			</div>
			<div className="flex flex-[1] justify-end">
				<CardIcon size={5} icon={Settings} noBackground={true}></CardIcon>
			</div>
		</div>
	);
};
