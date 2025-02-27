import React from 'react';
import AddIcon from '../../../../assets/icons/add-icon.svg';
import { calculateValueInCurrency } from '../../../../utils/calculateValueInCurrency';
import { Categorie } from './Categorie';
import { categories } from '../../../../db';
import { EditAddDeleteButton } from '../../../buttons';
import { SectionContainerHeader } from '../../../SectionContainerHeader/SectionContainerHeader';

export const CategoriesLayout = ({ isUSD, rubleCourse }) => {
	return (
		<div id="column__categories" className="flex flex-col flex-4 p-4 rounded-3xl bg-sky-950/40">
			<div id="categories__title-and-buitton" className="flex justify-between gap-2 mb-2">
				<SectionContainerHeader title={'Категории'} />
				<EditAddDeleteButton icon={AddIcon} title={'Изменить'} to={''} alt={'Категории расходов'} />
			</div>
			<div
				id="spend-categories__container"
				className="flex flex-4 flex-wrap gap-4 pr-2 justify-between max-h-[35vh] w-full rounded-[16px] overflow-y-auto overscroll-auto scroll-smooth scrollbar"
			>
				{categories.map((categorie) => {
					return (
						<Categorie
							key={categorie.id}
							budget={calculateValueInCurrency(categorie.budget, isUSD, rubleCourse)}
							balance={calculateValueInCurrency(categorie.balance, isUSD, rubleCourse)}
							categorie={categorie.name}
							icon={categorie.icon}
						/>
					);
				})}
			</div>
		</div>
	);
};
