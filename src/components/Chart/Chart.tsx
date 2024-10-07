import { useEffect, useState, useRef, useMemo } from 'react';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';
import throttle from 'lodash/throttle';

// type definition for SignalData
interface SignalData {
    time: string;
    signals: number[];
}

export default function Chart() {
    const [data, setData] = useState<SignalData[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [fps, setFps] = useState<number>(0);
    const [signalsPerSecond, setSignalsPerSecond] = useState<number>(0);

    const NUM_SIGNALS_ON_CHART = 100;

    const signalCountRef = useRef(0);
    const lastIntervalRef = useRef(Date.now());

    // throttled function to update chart data
    const updateChartData = useRef(
        throttle((newData: any[]) => {
            setChartData(
                newData.slice(-NUM_SIGNALS_ON_CHART).map((entry) => ({
                    time: new Date(entry.time).toLocaleTimeString(),
                    signal1: entry.signals[0],
                    signal2: entry.signals[1],
                    signal3: entry.signals[2],
                    signal4: entry.signals[3],
                    signal5: entry.signals[4],
                }))
            );
        }, 100)
    ).current;

    const memoizedChartData = useMemo(() => {
        return data.slice(-NUM_SIGNALS_ON_CHART).map((entry) => ({
            time: new Date(entry.time).toLocaleTimeString(),
            signal1: entry.signals[0],
            signal2: entry.signals[1],
            signal3: entry.signals[2],
            signal4: entry.signals[3],
            signal5: entry.signals[4],
        }));
    }, [data]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            const parsedData: SignalData = JSON.parse(event.data);
            signalCountRef.current++;
            setData((prevData) => {
                const newData = [...prevData, parsedData];
                updateChartData(newData);
                return newData;
            });
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => ws.close();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = Date.now();
            const elapsed = (now - lastIntervalRef.current) / 1000;

            setFps(Math.round(signalCountRef.current / elapsed));
            setSignalsPerSecond(Math.round(signalCountRef.current / elapsed));

            signalCountRef.current = 0;
            lastIntervalRef.current = now;
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">
                Neural Signal Visualization
            </h1>

            <LineChart width={600} height={400} data={memoizedChartData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="signal1" stroke="#8884d8" />
                <Line type="monotone" dataKey="signal2" stroke="#82ca9d" />
                <Line type="monotone" dataKey="signal3" stroke="#ffc658" />
                <Line type="monotone" dataKey="signal4" stroke="#ff7300" />
                <Line type="monotone" dataKey="signal5" stroke="#413ea0" />
            </LineChart>

            <p>FPS: {fps}</p>
            <p>Signals per second: {signalsPerSecond}</p>

            <table className="min-w-full table-auto mt-6">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Signal 1</th>
                        <th>Signal 2</th>
                        <th>Signal 3</th>
                        <th>Signal 4</th>
                        <th>Signal 5</th>
                    </tr>
                </thead>
                <tbody>
                    {memoizedChartData.map((row, index) => (
                        <tr key={index}>
                            <td>{row.time}</td>
                            <td>{row.signal1}</td>
                            <td>{row.signal2}</td>
                            <td>{row.signal3}</td>
                            <td>{row.signal4}</td>
                            <td>{row.signal5}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
