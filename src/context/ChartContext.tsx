import React, { createContext, useContext, useState } from 'react';

interface ChartContextProps {
    batchesPerSecond: number;
    setBatchesPerSecond: (value: number) => void;
    chartSize: number;
    setChartSize: (value: number) => void;
    signalsOn: boolean[];
    toggleSignal: (index: number) => void;
    selectedChart: string;
    setSelectedChart: (value: string) => void;
}

// Create the context
const ChartContext = createContext<ChartContextProps | undefined>(undefined);

// Create a provider component
export const ChartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [batchesPerSecond, setBatchesPerSecond] = useState<number>(30); // Default value
    const [chartSize, setChartSize] = useState<number>(30); // Default value
    const [signalsOn, setSignalsOn] = useState<boolean[]>([
        true,
        true,
        true,
        true,
        true,
    ]);
    const [selectedChart, setSelectedChart] = useState('sync');

    const toggleSignal = (index: number) => {
        setSignalsOn((prevSignals) =>
            prevSignals.map((signal, i) => (i === index ? !signal : signal))
        );
    };

    return (
        <ChartContext.Provider
            value={{
                batchesPerSecond,
                setBatchesPerSecond,
                chartSize,
                setChartSize,
                signalsOn,
                toggleSignal,
                selectedChart,
                setSelectedChart,
            }}
        >
            {children}
        </ChartContext.Provider>
    );
};

// Custom hook to use the Chart context
export const useChartContext = () => {
    const context = useContext(ChartContext);
    if (!context) {
        throw new Error('useChartContext must be used within a ChartProvider');
    }
    return context;
};
