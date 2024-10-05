import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import SignalTable from './components/SignalTable';
import SignalChart from './components/SignalChart';

import { SignalData, CircularBuffer, DataPoint } from './util/schema';

export default function DataVisual() {
    const NUM_SIGNALS_ON_CHART = 256;

    const bufferRef = useRef(
        new CircularBuffer<SignalData>(NUM_SIGNALS_ON_CHART)
    );

    const [updateCounter, setUpdateCounter] = useState(0);
    const [signalsPerSecond, setSignalsPerSecond] = useState(0);
    const [fps, setFps] = useState(0);

    const signalCountRef = useRef(0);
    const frameCountRef = useRef(0);
    const lastIntervalRef = useRef(Date.now());

    const updateData = useCallback((newData: SignalData) => {
        bufferRef.current.push(newData);
        signalCountRef.current++;
        setUpdateCounter((prev) => prev + 1);
    }, []);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onmessage = (event) => {
            const parsedData: SignalData = JSON.parse(event.data);
            updateData(parsedData);
        };
        return () => ws.close();
    }, [updateData]);

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

            setSignalsPerSecond(Math.round(signalCountRef.current / elapsed));
            setFps(Math.round(frameCountRef.current / elapsed));

            signalCountRef.current = 0;
            frameCountRef.current = 0;
            lastIntervalRef.current = now;
        }, 1000); // Update every second

        return () => {
            clearInterval(intervalId);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const chartData = useMemo<DataPoint[]>(() => {
        return bufferRef.current.getItems().map((entry) => ({
            time: new Date(entry.time).toLocaleTimeString(),
            signal1: entry.signals[0],
            signal2: entry.signals[1],
            signal3: entry.signals[2],
            signal4: entry.signals[3],
            signal5: entry.signals[4],
        }));
    }, [updateCounter]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">
                Neural Signal Visualization
            </h1>
            <SignalChart chartData={chartData} />
            <p>Signals per second: {signalsPerSecond}</p>
            <p>FPS: {fps}</p>
            <SignalTable chartData={chartData} />
        </div>
    );
}
