import { FinanceAccount } from '../../../pages/FinancesPage/FinanceAccount/FinanceAccount';
import { Categorie } from '../../../pages/FinancesPage/Categories';
import { useCurrency } from '../../../hooks';
import { calculateValueInCurrency } from '../../../utils';

interface Entity {
    id?: string;
    name: string;
    balance?: string | number;
    budget?: string | number;
    icon: string;
}

interface SelectedCategoriesProps {
    formState: {
        selectedAccount?: Entity | null;
        selectedCategory?: Entity | null;
    };
}

const parseToNumber = (value?: string | number): number => {
    if (value === undefined || value === null) return 0;
    if (typeof value === 'number') return value;
    return parseFloat(value.replace(/[^\d.-]/g, '')) || 0;
};

export const SelectedCategories = ({ formState }: SelectedCategoriesProps) => {
    const { isUSD, rubleCourse } = useCurrency();

    const safeRubleCourse = rubleCourse || 1;

    return (
        <section className="flex flex-wrap 2xl:flex-nowrap gap-4 items-center justify-center text-start">
            {formState.selectedAccount && (
                <FinanceAccount
                    id={formState.selectedAccount.id || 'temp-id'}
                    accountName={formState.selectedAccount.name}
                    accountBalance={calculateValueInCurrency(
                        parseToNumber(formState.selectedAccount.balance),
                        isUSD,
                        safeRubleCourse
                    )}
                    icon={formState.selectedAccount.icon}
                    noButton={true}
                />
            )}
            <p className="flex xl:rotate-360 rotate-90">{'\u27A0'}</p>
            {formState.selectedCategory && (
                <Categorie
                    id={formState.selectedCategory.id || 'temp-id'}
                    noButton={true}
                    budget={calculateValueInCurrency(parseToNumber(formState.selectedCategory.budget), isUSD, safeRubleCourse)}
                    balance={calculateValueInCurrency(parseToNumber(formState.selectedCategory.balance), isUSD, safeRubleCourse)}
                    categorie={formState.selectedCategory.name}
                    icon={formState.selectedCategory.icon}
                />
            )}
        </section>
    );
};
