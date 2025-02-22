import React from 'react';
import { WideOperationsButton } from '../buttons';

export const OperationsPanel = ({ onClick }) => {
	return (
		<div id="operations__container" className="flex flex-col flex-1 p-4 rounded-[26px] bg-sky-950/40">
			<div id="operations__buttons" className="flex items-start flex-col gap-4">
				<span className="flex font-medium text-2xl">Операции</span>
				<div className="flex gap-4 w-full justify-between items-center">
					<WideOperationsButton onClick={onClick} color={'bg-[#b9ff80]'} alt="income">
						<span className="text-lg font-semibold">Доходы +</span>
					</WideOperationsButton>
					<WideOperationsButton onClick={onClick} color={'bg-[#ff81b6]'} alt="income">
						<span className="text-lg font-semibold">Расходы - </span>
					</WideOperationsButton>
				</div>
			</div>
		</div>
	);
};
