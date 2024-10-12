import { useState } from 'react';
import useWebSocketData from '@/utils/websocket-utils';
import { rechartsProcessing } from '@/utils/chart-utils';

import LineChart from './LineChart';
import DataTable from './DataTable';
import Sliders from './Sliders';

export default function Chart() {
    const [batchesPerSecond, setBatchesPerSecond] = useState(60); // state to control batches per second
    const [chartSize, setChartSize] = useState(50); // state to control chart size

    const { renderData } = useWebSocketData(chartSize, batchesPerSecond);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-sans mb-6 font-medium">
                Neural Signal Visualization
            </h1>
            <Sliders
                batchesPerSecond={batchesPerSecond}
                setBatchesPerSecond={setBatchesPerSecond}
                chartSize={chartSize}
                setChartSize={setChartSize}
            />
            <LineChart renderData={rechartsProcessing(renderData)} />
            <DataTable renderData={rechartsProcessing(renderData)} />
        </div>
    );
}
