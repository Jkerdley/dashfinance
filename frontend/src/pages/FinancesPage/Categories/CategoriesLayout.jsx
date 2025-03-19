import React, { memo, useState } from 'react';
import AddIcon from '../../../assets/icons/add-icon.svg';
import { Categorie } from './Categorie';
import { EditAddDeleteButton } from '../../../components/buttons';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { useFetchCategoriesInCurrency } from '../../../hooks';
import { Loader } from '../../../components/Loaders/Loader';
import { CategoriesSelector } from '../../../components/sortSelector/categoriesSelector';
import { useDispatch, useSelector } from 'react-redux';
import { selectAddCategoryModal, selectUpdateCategoryModal } from '../../../store/selectors';
import { AddCategoryModal } from '../../../components/modalWindow/AddCategoryModal';
import {
	closeAddCategoryModal,
	closeUpdateCategoryModal,
	openAddCategoryModal,
} from '../../../store/actions';
import { UpdateCategoryModal } from '../../../components/modalWindow/UpdateCategoryModal';

export const CategoriesLayout = () => {
	const [selectedSortType, setSelectedSortType] = useState('month');
	const categoryModal = useSelector(selectAddCategoryModal);
	const updateCategoryModal = useSelector(selectUpdateCategoryModal);

	const dispatch = useDispatch();
	const { categoriesInCurrency, categoriesIsLoading } = useFetchCategoriesInCurrency(selectedSortType);

	const handleSortChange = () => {
		setSelectedSortType(selectedSortType === 'month' ? 'thisYear' : 'month');
	};

	const IsNoCategories =
		categoriesInCurrency.length === 0 ? (
			<span className="flex items-center justify-center mt-20 ">Добавьте категории расходов</span>
		) : (
			''
		);

	return (
		<section id="column__categories" className="flex flex-col flex-5 p-4 rounded-3xl bg-sky-950/40">
			<div
				id="categories__title-and-buitton"
				className="flex sm:flex-nowrap flex-wrap justify-between gap-2 mb-2"
			>
				<SectionContainerHeader title={'Категории'} />
				<CategoriesSelector handleSortChange={handleSortChange} selectedSortType={selectedSortType} />
				<EditAddDeleteButton
					onClick={() => dispatch(openAddCategoryModal())}
					icon={AddIcon}
					title={'Добавить'}
					to={''}
					alt={'Категории расходов'}
				/>
			</div>
			{IsNoCategories}
			<div
				id="spend-categories__container"
				className="flex flex-4 flex-wrap gap-4 pr-2 justify-start max-h-[52vh] 2xl:max-h-[32vh] w-full rounded-[16px] overflow-y-auto overflow-x-hidden overscroll-auto scroll-smooth scrollbar"
			>
				{categoryModal.isOpen && (
					<AddCategoryModal
						isOpen={categoryModal.isOpen}
						onClose={() => dispatch(closeAddCategoryModal())}
					/>
				)}
				{updateCategoryModal.isOpen && (
					<UpdateCategoryModal
						categoriesInCurrency={categoriesInCurrency}
						categoryId={updateCategoryModal.categoryIdForUpdate}
						isOpen={updateCategoryModal.isOpen}
						onClose={() => dispatch(closeUpdateCategoryModal())}
					/>
				)}
				{categoriesIsLoading ? (
					<Loader />
				) : (
					categoriesInCurrency.map((categorie) => {
						return (
							<Categorie
								key={categorie.id}
								id={categorie.id}
								budget={categorie.budget}
								balance={categorie.balance}
								categorie={categorie.name}
								icon={categorie.icon}
							/>
						);
					})
				)}
			</div>
		</section>
	);
};
