import { memo } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CustomRadialTooltip } from '../CustomTooltip';

interface ChartDataPoint {
    name: string;
    value?: number;
    balance?: number;
    id?: string;
    [key: string]: any;
}

interface PieDiagramChartProps {
    mappedData: ChartDataPoint[];
    isCrypto: boolean;
}

const COLORS = [
    '#ee529b', '#ff7285', '#e08d3f', '#ecbd56', '#f3d860',
    '#3ed682', '#5ae0a2', '#3ed6ba', '#59e7e7', '#60d1f3', '#6ed1f8',
];

export const PieDiagramChart = memo((props: PieDiagramChartProps) => {
    const { mappedData, isCrypto } = props;

    const pieProps = {
        cx: '50%',
        cy: '90%',
        innerRadius: '65%',
        outerRadius: '139%',
        startAngle: 180,
        endAngle: 0,
        animationBegin: 0,
        animationDuration: 500,
    };

    return (
        <PieChart
            width={Math.min(window.innerWidth * 0.4, 370)}
            height={Math.min(window.innerWidth * 0.3, 270)}
        >
            <Pie
                data={mappedData}
                {...pieProps}
                endAngle={0}
                cornerRadius={4}
                stroke="none"
                paddingAngle={4}
                dataKey="value"
                isAnimationActive={true}
                animationEasing="ease-in-out"
            >
                {mappedData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>

            <Tooltip content={<CustomRadialTooltip isCrypto={isCrypto} active={false} payload={[]} />} />
        </PieChart>
    );
});

PieDiagramChart.displayName = 'PieDiagramChart';
