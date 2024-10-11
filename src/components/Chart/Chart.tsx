import { useEffect, useState, useRef } from 'react';

import LineChart from './LineChart';
import DataTable from './DataTable';

// type definition for SignalData
interface SignalData {
    time: string;
    signals: number[];
}

export default function Chart() {
    const [data, setData] = useState<SignalData[]>([]); // hook for raw data
    const [chartData, setChartData] = useState<any[]>([]); // hook for processed data for chart/table (might need to change?)
    const [fps, setFps] = useState<number>(0); // hook for current fps, updated every second
    const [signalsPerSecond, setSignalsPerSecond] = useState<number>(0); // hook for keeping track of signals received per second

    // arbitrary constant for number of signals to be shown on x axis (can be changed to be variable with a slider)
    const NUM_SIGNALS_ON_CHART = 100;

    // using useRef hook so that frontend only re-renders after final fps or signal count is calculated for that second
    const frameCountRef = useRef(0);
    const signalCountRef = useRef(0);
    const lastIntervalRef = useRef(Date.now());

    // everything here loads as soon as component first renders
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        // logic that runs for every received message
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

    // not sure if using another useEffect is a good idea here tbh
    useEffect(() => {
        let animationFrameId: number;

        const measureFps = () => {
            frameCountRef.current++;
            animationFrameId = requestAnimationFrame(measureFps);
        };

        measureFps();

        const intervalId = setInterval(() => {
            const now = Date.now();
            const elapsed = (now - lastIntervalRef.current) / 1000; // Convert to seconds

            setFps(Math.round(frameCountRef.current / elapsed));
            setSignalsPerSecond(Math.round(signalCountRef.current / elapsed));

            frameCountRef.current = 0;
            signalCountRef.current = 0;
            lastIntervalRef.current = now;
        }, 1000); // Update every second

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-sans mb-6 font-medium">
                Neural Signal Visualization
            </h1>

            <LineChart chartData={chartData} />

            <p className="font-sans">FPS: {fps}</p>
            <p className="font-sans">Signals per second: {signalsPerSecond}</p>

            <DataTable chartData={chartData} />
        </div>
    );
}
