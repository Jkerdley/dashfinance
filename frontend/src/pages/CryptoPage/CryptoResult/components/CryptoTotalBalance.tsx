import { cleanValue } from '../../../../utils';

interface CryptoTotalBalanceProps {
    totalBalanceForDate: string;
    isUSD: boolean;
}

export const CryptoTotalBalance = ({ totalBalanceForDate, isUSD }: CryptoTotalBalanceProps) => {
    const numericBalance = parseFloat(totalBalanceForDate.replace(/[^\d.-]/g, '')) || 0;
    const colorClass = numericBalance >= 0 ? 'text-main-green' : 'text-main-red';

    return (
        <>
            <span className="text-xl font-medium transition-all">Баланс:</span>
            <div className="flex items-center gap-2">
                <span
                    className={`text-xl md:text-3xl lg:text-5xl 2xl:text-5xl mt-1 font-medium transition-all duration-350 ease-in-out ${colorClass}`}
                >
                    {isUSD ? '$ ' : '\u20bd'}
                </span>
                <span
                    className={`text-5xl lg:text-7xl 2xl:text-8xl font-bold transition-all duration-350 ease-in-out truncate ${colorClass}`}
                >
                    {cleanValue(totalBalanceForDate)}
                </span>
            </div>
        </>
    );
};
