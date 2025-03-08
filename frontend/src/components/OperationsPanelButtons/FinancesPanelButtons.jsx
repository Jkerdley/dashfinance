import React from 'react';
import { SectionContainerHeader } from '../SectionContainerHeader/SectionContainerHeader';
import { WideOperationsButton } from '../buttons';

export const FinancesPanelButtons = ({ handleOperationClick }) => {
	return (
		<section id="operations__container" className="flex flex-col flex-1 p-4 rounded-[26px] bg-sky-950/40">
			<div id="operations__buttons" className="flex items-start flex-col gap-4">
				<SectionContainerHeader title={'Операции'} />
				<div className="flex gap-4 w-full justify-between items-center">
					<WideOperationsButton
						onClick={() => handleOperationClick('add')}
						color={'bg-main-green'}
						alt="Доходы"
					>
						<span className="text-lg font-semibold">Доходы +</span>
					</WideOperationsButton>
					<WideOperationsButton
						onClick={() => handleOperationClick('spend')}
						color={'bg-main-red'}
						alt="Расходы"
					>
						<span className="text-lg font-semibold">Расходы - </span>
					</WideOperationsButton>
				</div>
			</div>
		</section>
	);
};
