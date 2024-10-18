import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import useRenderTracker from '@/hooks/useRenderTracker';
import { Props } from '@/types/schema';

const SynchronizedCharts: React.FC<{ renderData: Props[] }> = ({
    renderData,
}) => {
    const fps = useRenderTracker([renderData]);

    return (
        <>
            <h2>LineChart FPS: {fps}</h2>
            <ResponsiveContainer width="70  %" height={525}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateRows: 'repeat(5, 1fr)',
                    }}
                >
                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`}
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="signal1"
                            stroke="#9F76A8"
                            strokeWidth={2}
                        />
                    </LineChart>

                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`} // Add 'uV' to each tick
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="signal2"
                            stroke="#4e73b1"
                            strokeWidth={2}
                        />
                    </LineChart>

                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`} // Add 'uV' to each tick
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="signal3"
                            stroke="#45947f"
                            strokeWidth={2}
                        />
                    </LineChart>

                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="time" tick={false} />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`} // Add 'uV' to each tick
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="signal4"
                            stroke="#eac53f"
                            strokeWidth={2}
                        />
                    </LineChart>

                    <LineChart
                        width={1000}
                        height={100}
                        data={renderData}
                        syncId="timeAxis"
                    >
                        <CartesianGrid stroke="#ccc" />
                        <XAxis
                            dataKey="time"
                            tick={true}
                            label={{
                                value: 'Time (ms)',
                                dy: 10,
                                style: { fill: '#333', fontWeight: 'bold' },
                            }}
                        />
                        <YAxis
                            domain={[-200, 200]}
                            tickFormatter={(value) => `${value} uV`} // Add 'uV' to each tick
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="signal5"
                            stroke="#f66a69"
                            strokeWidth={2}
                        />
                    </LineChart>
                </div>
            </ResponsiveContainer>
        </>
    );
};

export default SynchronizedCharts;
