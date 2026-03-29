interface PNLItem {
    profitPercentage: number | string;
    growValue: number | string;
    [key: string]: any;
}

interface PNLpercentagesProps {
    totalPNL: PNLItem[];
}

export const PNLpercentages = ({ totalPNL }: PNLpercentagesProps) => {
    const calculateAverageProfitPercentage = (array: PNLItem[], key: keyof PNLItem) => {
        if (array.length === 0) return 0;

        const totalProfit = array.reduce((sum, item) => sum + (Number(item[key]) || 0), 0);
        return totalProfit / array.length;
    };

    const averageProfit = calculateAverageProfitPercentage(totalPNL, 'profitPercentage');
    const todayProfit = calculateAverageProfitPercentage(totalPNL, 'growValue');

    const averageProfitInt = parseInt(String(averageProfit)) || 0;
    const todayProfitInt = parseInt(String(todayProfit)) || 0;

    return (
        <section className="flex flex-2 justify-center md:justify-evently 2xl:justify-around md:gap-6 gap-2">
            <div className="flex gap-1 flex-wrap items-center justify-center">
                <span className="md:text-lg text-center text-sm">PNL за все время:</span>
                <div className="flex gap-1 justify-center">
                    <span
                        className={`text-lg truncate ${averageProfitInt < 0 ? 'text-main-red' : 'text-main-green'}`}
                    >
                        {averageProfitInt} %
                    </span>
                </div>
            </div>
            <div className="flex gap-1 flex-wrap items-center justify-center">
                <span className="md:text-lg text-sm">PNL за сегодня:</span>
                <div className="flex gap-1 justify-center">
                    <span
                        className={`text-lg truncate ${todayProfitInt < 0 ? 'text-main-red' : 'text-main-green'}`}
                    >
                        {todayProfitInt} %
                    </span>
                </div>
            </div>
        </section>
    );
};
