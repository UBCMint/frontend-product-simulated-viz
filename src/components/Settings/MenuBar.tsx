import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarCheckboxItem,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { useChartContext } from '@/context/ChartContext';
import { Slider } from '@/components/ui/slider';

export default function MenuBar() {
    const {
        batchesPerSecond,
        setBatchesPerSecond,
        chartSize,
        setChartSize,
        signalsOn,
        toggleSignal,
        setSelectedChart,
    } = useChartContext();

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>System Control Panel</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem onSelect={() => setSelectedChart('sync')}>
                        Sync Chart
                    </MenubarItem>
                    <MenubarItem onSelect={() => setSelectedChart('line')}>
                        Aggregated Chart
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Filters</MenubarTrigger>
                <MenubarContent>
                    {signalsOn.map((isOn, index) => (
                        <MenubarCheckboxItem
                            key={index}
                            checked={isOn}
                            onSelect={() => toggleSignal(index)}
                        >
                            Signal {index + 1}
                        </MenubarCheckboxItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
                <MenubarTrigger>Settings</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Frequency: {batchesPerSecond}
                        <Slider
                            defaultValue={[batchesPerSecond]}
                            min={1}
                            max={60}
                            step={1}
                            onValueCommit={(value) =>
                                setBatchesPerSecond(value[0])
                            }
                        />
                    </MenubarItem>

                    <MenubarItem>
                        Chart Size: {chartSize}
                        <Slider
                            defaultValue={[chartSize]}
                            min={10}
                            max={60}
                            step={1}
                            onValueCommit={(value) => setChartSize(value[0])}
                        />
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}
