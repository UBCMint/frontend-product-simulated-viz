import { useEffect, useState } from 'react';
import SignalTable from './SignalTable';
import SignalChart from './SignalChart';

// Define the structure of the data you expect
interface SignalData {
    time: string; // or use Date if you prefer
    signals: number[]; // assuming signals is an array of numbers
}

export default function DataVisual() {
    const [data, setData] = useState<SignalData[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);

    const NUM_SIGNALS_ON_CHART = 100;

    const [lastTimestamp, setLastTimestamp] = useState<number | null>(null);
    const [refreshRate, setRefreshRate] = useState<number | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = (event) => {
            const parsedData: SignalData = JSON.parse(event.data);
            setData((prevData) => {
                const newData = [...prevData, parsedData];
                setChartData(
                    newData.slice(-NUM_SIGNALS_ON_CHART).map((entry) => ({
                        time: new Date(entry.time).toLocaleTimeString(), // Convert time for display
                        signal1: entry.signals[0],
                        signal2: entry.signals[1],
                        signal3: entry.signals[2],
                        signal4: entry.signals[3],
                        signal5: entry.signals[4],
                    }))
                );

                const currentTime = Date.now();
                if (lastTimestamp) {
                    const diff = currentTime - lastTimestamp;
                    setRefreshRate(diff);
                }
                setLastTimestamp(currentTime);

                return newData;
            });
        };

        return () => ws.close();
    }, [lastTimestamp]);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">
                Neural Signal Visualization
            </h1>
            <SignalChart chartData={chartData} />
            <p>{refreshRate ? `${refreshRate} ms` : ``}</p>
            <SignalTable chartData={chartData} />
        </div>
    );
}
