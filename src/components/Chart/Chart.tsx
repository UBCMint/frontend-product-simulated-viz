import useWebSocketData from '@/utils/websocket-utils';
import rechartsProcessing from '@/utils/chart-utils';

import LineChart from './LineChart';
import DataTable from './DataTable';

const NUM_SIGNALS_ON_CHART = 100;
const DESIRED_FPS = 60;

export default function Chart() {
    const { renderData } = useWebSocketData(NUM_SIGNALS_ON_CHART, DESIRED_FPS);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-sans mb-6 font-medium">
                Neural Signal Visualization
            </h1>

            <LineChart renderData={rechartsProcessing(renderData)} />

            <DataTable renderData={rechartsProcessing(renderData)} />
        </div>
    );
}
