import useWebsocket from '@/hooks/useWebsocket';
import useSliderSettings from '@/hooks/useSliderSettings';
import { rechartsProcessing } from '@/lib/chart-utils';

import { Card, CardHeader } from '@/components/ui/card';
import LineChart from '@/components/chart/LineChart';
import DataTable from '@/components/chart/DataTable';
import Sliders from '@/components/chart/Sliders';

export default function Chart() {
    const { batchesPerSecond, setBatchesPerSecond, chartSize, setChartSize } =
        useSliderSettings();
    const { renderData } = useWebsocket(chartSize, batchesPerSecond);

    return (
        <div>
            <h1 className="text-3xl font-sans mb-6 font-medium">
                Neural Signal Visualization
            </h1>
            <div className="flex flex-col md:flex-row justify-centre items-start gap-6">
                <LineChart renderData={rechartsProcessing(renderData)} />
                <Sliders
                    batchesPerSecond={batchesPerSecond}
                    setBatchesPerSecond={setBatchesPerSecond}
                    chartSize={chartSize}
                    setChartSize={setChartSize}
                />
            </div>
            <DataTable renderData={rechartsProcessing(renderData)} />
        </div>
    );
}
