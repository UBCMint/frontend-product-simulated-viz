import { Slider } from '@/components/ui/slider';
import { SlidersProps } from '@/types/schema';

export default function Sliders({
    batchesPerSecond,
    setBatchesPerSecond,
    chartSize,
    setChartSize,
}: SlidersProps) {
    return (
        <>
            <h2 className="text-lg font-sans mb-2">
                Batches Per Second: {batchesPerSecond}
            </h2>
            <Slider
                defaultValue={[batchesPerSecond]}
                min={1}
                max={120}
                step={1}
                onValueChange={(value) => setBatchesPerSecond(value[0])}
            />
            <h2 className="text-lg font-sans mb-2">Chart Size: {chartSize}</h2>
            <Slider
                defaultValue={[chartSize]}
                min={10}
                max={100}
                step={1}
                onValueChange={(value) => setChartSize(value[0])}
            />
        </>
    );
}
