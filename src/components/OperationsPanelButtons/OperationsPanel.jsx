import React from 'react';
import { WideOperationsButton } from '../buttons';

export const OperationsPanel = ({ onCryptoClick, onClick, isCrypto }) => {
	return isCrypto ? (
		<div id="operations__buttons" className="flex flex-col mt-4 items-start gap-4">
			<div className="flex gap-4 w-full justify-between items-center">
				<WideOperationsButton onClick={onCryptoClick} color={'bg-main-green'} alt="income">
					<span className="text-lg font-semibold">Покупка +</span>
				</WideOperationsButton>
				<WideOperationsButton onClick={onCryptoClick} color={'bg-main-red'} alt="expenses">
					<span className="text-lg font-semibold">Продажа - </span>
				</WideOperationsButton>
			</div>
		</div>
	) : (
		<div id="operations__container" className="flex flex-col flex-1 p-4 rounded-[26px] bg-sky-950/40">
			<div id="operations__buttons" className="flex items-start flex-col gap-4">
				<span className="flex font-medium text-xl">Операции</span>
				<div className="flex gap-4 w-full justify-between items-center">
					<WideOperationsButton onClick={onClick} color={'bg-main-green'} alt="income">
						<span className="text-lg font-semibold">Доходы +</span>
					</WideOperationsButton>
					<WideOperationsButton onClick={onClick} color={'bg-main-red'} alt="expenses">
						<span className="text-lg font-semibold">Расходы - </span>
					</WideOperationsButton>
				</div>
			</div>
		</div>
	);
};
