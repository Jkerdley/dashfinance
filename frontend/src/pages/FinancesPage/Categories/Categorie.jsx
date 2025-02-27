import React from 'react';
import { CardIcon, OptionsButton } from '../../../components/buttons';

import { getIconOfCategorie } from '../../../utils';

export const Categorie = ({ categorie, balance, budget, icon, noButton }) => {
	const isOverBalance = () => {
		if (!budget) {
			return 'text-main-green';
		} else if (Number(balance) > Number(budget)) {
			return 'text-main-red';
		} else {
			return 'text-main-green';
		}
	};

	return (
		<section
			id="categorie-wrapper"
			className="flex flex-2 max-w-3xl items-center justify-between p-2 rounded-2xl h-14 bg-sky-300/20 "
		>
			<div
				id="categorie-inside-container"
				className={`flex items-center justify-start ${noButton ? 'w-[20vw]' : 'w-80'}`}
			>
				<CardIcon padding="p-2" buttonSize={10} icon={getIconOfCategorie(icon)} />
				<div
					id="categorie-text-container"
					className={`flex flex-col ml-2  ${noButton ? 'w-[400px]' : 'w-full'} overflow-hidden`}
				>
					<p className="text-base truncate">{categorie}</p>
					<div id="categorie-budjet-container" className="flex gap-2">
						<p className={`text-sm ${isOverBalance()}`}>Расходы: {balance}</p>
						<p className="text-sm truncate">{budget ? `Бюджет: ${budget}` : ''}</p>
					</div>
				</div>
			</div>
			{noButton ? '' : <OptionsButton to={''} flex={'flex-[0.5]'} />}
		</section>
	);
};
