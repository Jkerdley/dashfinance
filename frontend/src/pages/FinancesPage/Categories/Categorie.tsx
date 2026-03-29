import { OptionsButton } from '../../../components/buttons';
import { CardIcon } from '../../../components/CardIcon';
import { getIconOfCategorie } from '../../../utils';
import { openModal } from '../../../store/slices/modalSlice';
import { MODAL_TYPES } from '../../../constants/modals';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import type { SortTypesValue } from '../../../constants/operations';
export interface CategoryItem {
    id: string;
    name: string;
    balance: string;
    budget?: string;
    icon: string;
    [key: string]: any;
}
interface CategorieProps {
    id: string;
    categorie: string;
    balance: string;
    budget?: string;
    icon: string;
    noButton?: boolean;
    currentSortType?: SortTypesValue;
}

export const Categorie = (props: CategorieProps) => {
    const {
        id,
        categorie,
        balance,
        budget,
        icon,
        noButton = false,
        currentSortType,
    } = props;

    const dispatch = useAppDispatch();

    const currentBalance = parseFloat(balance?.toString().replace(/[^\d.-]/g, '')) || 0;
    const currentBudget = budget ? parseFloat(budget?.toString().replace(/[^\d.-]/g, '')) : 0;

    const isOverBalance = currentBudget > 0 && currentBalance > currentBudget;
    const balanceColorClass = isOverBalance ? 'text-main-red' : 'text-main-green';

    const handleOptionsClick = () => {
        dispatch(
            openModal({
                modalType: MODAL_TYPES.UPDATE_CATEGORY,
                modalProps: {
                    categoryId: id,
                    currentSortType,
                },
            }),
        );
    };

    return (
        <div
            id={`categorie-${id}`}
            className="flex items-center justify-between p-2 rounded-2xl h-14 bg-sky-300/20 flex-2"
        >
            <div
                className={`flex items-center justify-start ${
                    noButton ? '2xl:w-[22vw] w-[38vw]' : 'md:min-w-90 min-w-50'
                }`}
            >
                <CardIcon padding="p-2" buttonSize={10} icon={getIconOfCategorie(icon)} />
                <div className={`flex flex-col ml-2 overflow-hidden ${noButton ? 'w-[400px]' : 'w-full'}`}>
                    <span className="text-base truncate font-medium text-white">{categorie}</span>
                    <div className="flex gap-2 truncate">
                        <span className={`text-sm truncate ${balanceColorClass}`}>Расходы: {balance}</span>
                        {currentBudget > 0 && (
                            <span className="sm:flex hidden text-sm truncate text-gray-400">
                                Бюджет: {budget}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {!noButton && <OptionsButton onClick={handleOptionsClick} flex="flex-[0.5]" />}
        </div>
    );
};
