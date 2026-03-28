import { useState } from 'react';
import AddIcon from '../../../assets/icons/add-icon.svg';
import { Categorie } from './Categorie';
import type { CategoryItem } from './Categorie';
import { EditAddDeleteButton } from '../../../components/buttons';
import { SectionContainerHeader } from '../../../components/SectionContainerHeader/SectionContainerHeader';
import { useFetchCategoriesInCurrency } from '../../../hooks';
import { Loader } from '../../../components/Loaders/Loader';
import { openModal } from '../../../store/slices/modalSlice';
import { MODAL_TYPES } from '../../../constants/modals';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { SORT_TYPES } from '../../../constants/operations';
import type { SortTypesValue } from '../../../constants/operations';
import { CategoriesSelector } from '../../../components/SortSelector';

export const CategoriesLayout = () => {
    const dispatch = useAppDispatch();

    const [selectedSortType, setSelectedSortType] = useState<SortTypesValue>(SORT_TYPES.MONTH);

    const { categoriesInCurrency, categoriesIsLoading } = useFetchCategoriesInCurrency(selectedSortType);

    const handleSortChange = () => {
        setSelectedSortType((prev) => (prev === SORT_TYPES.MONTH ? SORT_TYPES.THIS_YEAR : SORT_TYPES.MONTH));
    };

    // ВЕРНУЛИ КАК БЫЛО: Это кнопка создания НОВОЙ категории
    const handleOpenAddModal = () => {
        dispatch(openModal({ modalType: MODAL_TYPES.ADD_CATEGORY }));
    };

    return (
        <section id="column__categories" className="flex flex-col flex-5 p-4 rounded-3xl bg-sky-950/40">
            <div
                id="categories__title-and-button"
                className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:flex-nowrap"
            >
                <SectionContainerHeader title="Категории" />

                <div className="flex items-center gap-2">
                    <CategoriesSelector
                        handleSortChange={handleSortChange}
                        selectedSortType={selectedSortType}
                    />
                    <EditAddDeleteButton
                        onClick={handleOpenAddModal}
                        icon={AddIcon}
                        title="Добавить"
                        alt="Категории расходов"
                    />
                </div>
            </div>

            <div
                id="spend-categories__container"
                className="flex flex-col gap-4 pr-2 justify-start max-h-[52vh] 2xl:max-h-[32vh] w-full rounded-[16px] overflow-y-auto overflow-x-hidden overscroll-auto scroll-smooth scrollbar"
            >
                {categoriesIsLoading ? (
                    <Loader />
                ) : categoriesInCurrency.length === 0 ? (
                    <span className="flex items-center justify-center mt-20 text-slate-400">
                        Добавьте категории расходов
                    </span>
                ) : (
                    categoriesInCurrency.map((item: CategoryItem) => (
                        <Categorie
                            key={item.id}
                            id={item.id}
                            budget={item.budget}
                            balance={item.balance}
                            categorie={item.name}
                            icon={item.icon}
                            currentSortType={selectedSortType}
                        />
                    ))
                )}
            </div>
        </section>
    );
};
