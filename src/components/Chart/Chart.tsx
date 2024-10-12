import useWebSocketData from '@/utils/websocket-utils';
import { useFpsTracker, rechartsProcessing } from '@/utils/chart-utils';

import LineChart from './LineChart';
import DataTable from './DataTable';

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
