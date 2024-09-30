'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

// Define the structure of the data you expect
interface SignalData {
  time: string; // or use Date if you prefer
  signals: number[]; // assuming signals is an array of numbers
}

export default function Home() {
  // Specify the type for the data state
  const [data, setData] = useState<SignalData[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const parsedData: SignalData = JSON.parse(event.data);
      setData((prevData) => [...prevData, parsedData]); // Append new data
    };

    return () => ws.close();
  }, []);

  // Prepare chart data from the websocket data
  const chartData = data.map((entry) => ({
    time: new Date(entry.time).toLocaleTimeString(), // Convert time for display
    signal1: entry.signals[0],
    signal2: entry.signals[1],
    signal3: entry.signals[2],
    signal4: entry.signals[3],
    signal5: entry.signals[4],
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Neural Signal Visualization</h1>

      {/* Line chart for real-time signal data */}
      <LineChart width={600} height={400} data={chartData}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="signal1" stroke="#8884d8" />
        <Line type="monotone" dataKey="signal2" stroke="#82ca9d" />
        <Line type="monotone" dataKey="signal3" stroke="#ffc658" />
        <Line type="monotone" dataKey="signal4" stroke="#ff7300" />
        <Line type="monotone" dataKey="signal5" stroke="#413ea0" />
      </LineChart>

      {/* Table to display real-time data */}
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
          {data.map((row, index) => (
            <tr key={index}>
              <td>{new Date(row.time).toLocaleTimeString()}</td>
              <td>{row.signals[0]}</td>
              <td>{row.signals[1]}</td>
              <td>{row.signals[2]}</td>
              <td>{row.signals[3]}</td>
              <td>{row.signals[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
