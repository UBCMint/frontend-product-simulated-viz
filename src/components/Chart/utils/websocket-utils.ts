import { useEffect, useState, useRef } from 'react';
import { SignalData } from './schema';

const useWebSocketData = (NUM_SIGNALS_ON_CHART: number) => {
    const [data, setData] = useState<SignalData[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const signalCountRef = useRef(0);

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
    }, [NUM_SIGNALS_ON_CHART]);

    return { data, chartData, signalCountRef };
};

export default useWebSocketData;
