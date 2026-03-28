interface PNLinResultProps {
    totalPNL: any[];
    index: number;
    title: string;
}

export const PNLinResult = ({ totalPNL, index, title }: PNLinResultProps) => {
    const asset = totalPNL[index];

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <span className="text-sm xl:text-lg">{title}</span>
            <div className="flex md:flex-nowrap flex-wrap gap-2 justify-center text-main-green/90">
                <span className="sm:text-lg text-sm truncate">{asset?.name || '—'}:</span>
                <div className="flex justify-center gap-2 truncate">
                    <span className="sm:text-lg text-sm truncate">{asset?.profit || '0'}</span>
                    <span className="sm:text-lg text-sm truncate">
                        {totalPNL.length > 0 && asset ? parseInt(asset.profitPercentage) : 0}%
                    </span>
                </div>
            </div>
        </div>
    );
};
