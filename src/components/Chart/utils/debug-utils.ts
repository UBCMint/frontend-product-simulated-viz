import { useEffect, useState, useRef } from 'react';

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
