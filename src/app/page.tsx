'use client';

import Visualizer from '@/components/Visualizer/Visualizer';
import { ChartProvider } from '@/context/ChartContext';

export default function Home() {
    return (
        <ChartProvider>
            <Visualizer />
        </ChartProvider>
    );
}
