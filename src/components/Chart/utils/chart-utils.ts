import { useEffect, useState, useRef } from 'react';
import { SignalData, Props } from './schema';

const useFpsTracker = (signalCountRef: React.MutableRefObject<number>) => {
    const [fps, setFps] = useState(0);
    const [signalsPerSecond, setSignalsPerSecond] = useState(0);
    const frameCountRef = useRef(0);
    const lastIntervalRef = useRef(Date.now());

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
    }, [signalCountRef]);

    return { fps, signalsPerSecond };
};

export default useFpsTracker;

export function rechartsProcessing(renderData: SignalData[]): Props[] {
    if (!renderData) return [];

    return renderData.map((entry: SignalData) => ({
        time: new Date(entry.time).toLocaleTimeString(),
        signal1: entry.signals[0] || 0,
        signal2: entry.signals[1] || 0,
        signal3: entry.signals[2] || 0,
        signal4: entry.signals[3] || 0,
        signal5: entry.signals[4] || 0,
    }));
}
