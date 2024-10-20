export interface Props {
    time: string;
    signal1: number;
    signal2: number;
    signal3: number;
    signal4: number;
    signal5: number;
}
// Assuming these are your types

export interface SignalData {
    time: string;
    signal1: number;
    signal2: number;
    signal3: number;
    signal4: number;
    signal5: number;
}

export interface Props {
    time: string;
    // Adjust these fields based on the structure of `Props`
    signal1: number;
    signal2: number;
    signal3: number;
    signal4: number;
    signal5: number;
}

export interface SlidersProps {
    batchesPerSecond: number;
    setBatchesPerSecond: (value: number) => void;
    chartSize: number;
    setChartSize: (value: number) => void;
}
