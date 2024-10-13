import { Slider } from '@/components/ui/slider';
import { SlidersProps } from '@/types/schema';
import {
    Card,
    CardHeader,
    CardFooter,
    CardContent,
    CardTitle,
} from '@/components/ui/card';

export default function Sliders({
    batchesPerSecond,
    setBatchesPerSecond,
    chartSize,
    setChartSize,
}: SlidersProps) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle className="text-lg">Chart Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <h2 className="text-lg font-sans mb-2">
                    Batches Per Second: {batchesPerSecond}
                </h2>
                <Slider
                    defaultValue={[batchesPerSecond]}
                    min={1}
                    max={120}
                    step={1}
                    onValueCommit={(value) => setBatchesPerSecond(value[0])}
                />

                <h2 className="text-lg font-sans mb-2">
                    Chart Size: {chartSize}
                </h2>
                <Slider
                    defaultValue={[chartSize]}
                    min={10}
                    max={100}
                    step={1}
                    onValueCommit={(value) => setChartSize(value[0])}
                />
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}
