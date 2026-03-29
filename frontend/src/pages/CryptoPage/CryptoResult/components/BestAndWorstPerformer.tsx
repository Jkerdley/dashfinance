import { PNLinResult } from './PNLinResult';

interface BestAndWorstPerformerProps {
    totalPNL: any[];
    indexOfLastItem: number;
}

export const BestAndWorstPerformer = ({ totalPNL, indexOfLastItem }: BestAndWorstPerformerProps) => {
    return (
        <section className="flex flex-2 justify-center md:justify-evently 2xl:justify-around md:gap-6 gap-2">
            <PNLinResult totalPNL={totalPNL} index={indexOfLastItem} title="Лучший актив:" />
            <PNLinResult totalPNL={totalPNL} index={0} title="Худший актив:" />
        </section>
    );
};
