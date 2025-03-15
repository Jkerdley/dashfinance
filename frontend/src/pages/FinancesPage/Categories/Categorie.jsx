import React from 'react';
import { OptionsButton } from '../../../components/buttons';
import { CardIcon } from '../../../components/CardIcon';
import { getIconOfCategorie } from '../../../utils';
import { useDispatch } from 'react-redux';
import { openUpdateCategoryModal } from '../../../store/actions';

export const Categorie = ({ id, categorie, balance, budget, icon, noButton }) => {
	const dispatch = useDispatch();

	const isOverBalance = () => {
		if (!budget) {
			return 'text-main-green';
		} else if (Number(balance.slice(1).trim()) > Number(budget.slice(1).trim())) {
			return 'text-main-red';
		} else {
			return 'text-main-green';
		}
	};

	const handleOptionsClick = () => {
		dispatch(openUpdateCategoryModal(id));
	};

	return (
		<section
			id="categorie-wrapper"
			className={`flex flex-2 'max-w-3xl' items-center justify-between p-2 rounded-2xl h-14 bg-sky-300/20`}
		>
			<div
				id="categorie-inside-container"
				className={`flex items-center justify-start ${noButton ? '2xl:w-[22vw] w-[38vw]' : 'md:min-w-90 min-w-50'}`}
			>
				<CardIcon padding="p-2" buttonSize={10} icon={getIconOfCategorie(icon)} />
				<div
					id="categorie-text-container"
					className={`flex flex-col ml-2  ${noButton ? 'w-[400px]' : 'w-full'} overflow-hidden`}
				>
					<span className="text-base truncate">{categorie}</span>
					<div id="categorie-budjet-container" className="flex gap-2 truncate">
						<span className={`text-sm ${isOverBalance()}`}>Расходы: {balance}</span>
						<span className="text-sm  text-gray-300">
							{Number(budget.slice(1).trim()) > 0 ? `Бюджет: ${budget}` : ''}
						</span>
					</div>
				</div>
			</div>
			{noButton ? '' : <OptionsButton onClick={handleOptionsClick} flex={'flex-[0.5]'} />}
		</section>
	);
};
