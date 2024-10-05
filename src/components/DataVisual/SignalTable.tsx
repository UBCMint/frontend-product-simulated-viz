interface DataPoint {
    time: string;
    signal1: number;
    signal2: number;
    signal3: number;
    signal4: number;
    signal5: number;
}

interface SignalTableProps {
    chartData: DataPoint[];
}
export default function SignalTable({ chartData }: SignalTableProps) {
    return (
        <table className="min-w-full table-auto mt-6">
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Signal 1</th>
                    <th>Signal 2</th>
                    <th>Signal 3</th>
                    <th>Signal 4</th>
                    <th>Signal 5</th>
                </tr>
            </thead>
            <tbody>
                {chartData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.time}</td>
                        <td>{row.signal1}</td>
                        <td>{row.signal2}</td>
                        <td>{row.signal3}</td>
                        <td>{row.signal4}</td>
                        <td>{row.signal5}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
