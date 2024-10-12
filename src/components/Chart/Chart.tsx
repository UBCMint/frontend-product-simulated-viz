import useWebSocketData from './utils/websocket-utils';
import useFpsTracker from './utils/debug-utils';

import LineChart from './LineChart';
import DataTable from './DataTable';

import { SignalData, Props } from './utils/schema';

export default function Chart() {
    const NUM_SIGNALS_ON_CHART = 100;

    const { renderData, signalCountRef } =
        useWebSocketData(NUM_SIGNALS_ON_CHART);

    const { fps, signalsPerSecond } = useFpsTracker(signalCountRef);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-sans mb-6 font-medium">
                Neural Signal Visualization
            </h1>

            <LineChart renderData={rechartsProcessing(renderData)} />

            <p className="font-sans">FPS: {fps}</p>
            <p className="font-sans">Signals per second: {signalsPerSecond}</p>

            <DataTable renderData={rechartsProcessing(renderData)} />
        </div>
    );
}

function rechartsProcessing(renderData: SignalData[]): Props[] {
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
