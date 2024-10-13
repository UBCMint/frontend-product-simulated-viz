import { useState } from 'react';

export default function useSliderSettings() {
    const [batchesPerSecond, setBatchesPerSecond] = useState(60); // state to control batches per second
    const [chartSize, setChartSize] = useState(50); // state to control chart size

    return {
        batchesPerSecond,
        setBatchesPerSecond,
        chartSize,
        setChartSize,
    };
}
