import { useEffect, useState, useRef } from 'react';
import { SignalData } from '@/types/schema';

const useWebSocketData = (NUM_SIGNALS_ON_CHART: number) => {
    const [renderData, setRenderData] = useState<SignalData[]>([]); // data to be rendered
    const bufferRef = useRef<SignalData[]>([]); // storing all data from websocket
    const signalCountRef = useRef(0);
    const lastFrameTimeRef = useRef<number>(0);

    // bufferRef code to consume WebSocket
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            const parsedData: SignalData = JSON.parse(event.data);
            signalCountRef.current++;
            bufferRef.current.push(parsedData);
        };

        return () => ws.close(); // unmounting websocket = cleaning
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        const updateChart = (timestamp: number) => {
            if (timestamp - lastFrameTimeRef.current >= 1000 / 60) {
                if (bufferRef.current.length > 0) {
                    setRenderData((prevData) =>
                        [...prevData, ...bufferRef.current].slice(
                            -NUM_SIGNALS_ON_CHART
                        )
                    );
                }

                lastFrameTimeRef.current = timestamp; // Update last frame timestamp
            }

            animationFrameId = requestAnimationFrame(updateChart);
        };

        animationFrameId = requestAnimationFrame(updateChart);

        return () => cancelAnimationFrame(animationFrameId); // Cleanup animation frame
    }, [NUM_SIGNALS_ON_CHART]);

    return { renderData, signalCountRef };
};

export default useWebSocketData;
