import { useEffect, useState, useRef } from 'react';
import { SignalData } from '@/types/schema';

export default function useWebSocketData(
    NUM_SIGNALS_ON_CHART: number,
    DESIRED_FPS: number
) {
    const [renderData, setRenderData] = useState<SignalData[]>([]); // data to be rendered
    const bufferRef = useRef<SignalData[]>([]); // storing all data from websocket

    // bufferRef code to consume WebSocket
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            const parsedData: SignalData = JSON.parse(event.data);
            bufferRef.current.push(parsedData);
        };

        // send batches at specified interval
        const intervalId = setInterval(() => {
            if (bufferRef.current.length > 0) {
                const nextBatch = bufferRef.current.splice(
                    0,
                    Math.min(bufferRef.current.length, NUM_SIGNALS_ON_CHART)
                );
                setRenderData((prevData) => {
                    const updatedData = [...prevData, ...nextBatch].slice(
                        -NUM_SIGNALS_ON_CHART
                    );
                    return updatedData;
                });
            }
        }, 1000 / DESIRED_FPS);

        return () => ws.close(); // unmounting websocket = cleaning
    }, []);

    return { renderData };
}
