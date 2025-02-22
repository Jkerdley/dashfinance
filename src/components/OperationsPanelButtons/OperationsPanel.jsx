import React from 'react';
import { WideOperationsButton } from '../buttons';

export const OperationsPanel = ({ onClick }) => {
	return (
		<div id="operations__buttons" className="flex flex-col mt-4 items-start gap-4">
			<div className="flex gap-4 w-full justify-between items-center">
				<WideOperationsButton onClick={onClick} color={'bg-[#b9ff80]'} alt="income">
					<span className="text-lg font-semibold">Покупка +</span>
				</WideOperationsButton>
				<WideOperationsButton onClick={onClick} color={'bg-[#ff81b6]'} alt="income">
					<span className="text-lg font-semibold">Продажа - </span>
				</WideOperationsButton>
			</div>
		</div>
	);
};
