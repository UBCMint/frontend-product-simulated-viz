import {
    LineChart as RechartsLineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { ChartProps } from '@/types/schema';
import { useChartContext } from '@/context/ChartContext';

export default function LineCharts({ renderData = [] }: ChartProps) {
    const { signalsOn } = useChartContext();

    return (
        <ResponsiveContainer width="90%" height={400}>
            <RechartsLineChart data={renderData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                {signalsOn[0] && (
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="signal1"
                        stroke="#8884d8"
                    />
                )}
                {signalsOn[1] && (
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="signal2"
                        stroke="#82ca9d"
                    />
                )}
                {signalsOn[2] && (
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="signal3"
                        stroke="#ffc658"
                    />
                )}
                {signalsOn[3] && (
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="signal4"
                        stroke="#ff7300"
                    />
                )}
                {signalsOn[4] && (
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="signal5"
                        stroke="#413ea0"
                    />
                )}
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}
