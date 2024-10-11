import { useEffect, useState, useRef } from 'react';
import LineChartComponent from './LineChart';
import DataTable from './DataTable';

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

    const frameCountRef = useRef(0);
    const signalCountRef = useRef(0);
    const lastIntervalRef = useRef(Date.now());

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            const parsedData: SignalData = JSON.parse(event.data);
            signalCountRef.current++;
            setData((prevData) => {
                const newData = [...prevData, parsedData];
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
                return newData;
            });
        };

        return () => ws.close();
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const measureFps = () => {
            frameCountRef.current++;
            animationFrameId = requestAnimationFrame(measureFps);
        };

        measureFps();

        const intervalId = setInterval(() => {
            const now = Date.now();
            const elapsed = (now - lastIntervalRef.current) / 1000;

            setFps(Math.round(frameCountRef.current / elapsed));
            setSignalsPerSecond(Math.round(signalCountRef.current / elapsed));

            frameCountRef.current = 0;
            signalCountRef.current = 0;
            lastIntervalRef.current = now;
        }, 1000);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">
                Neural Signal Visualization
            </h1>

            <LineChartComponent chartData={chartData} />

            <p>FPS: {fps}</p>
            <p>Signals per second: {signalsPerSecond}</p>

            <DataTable chartData={chartData} />
        </div>
    );
}