import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SpeedChartProps {
  data: { time: number; speed: number }[];
}

const SpeedChart: React.FC<SpeedChartProps> = ({ data }) => {
  return (
    <div className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-2">Speed Chart</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
            label={{ value: "Time (ms)", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{
              value: "Speed (MB/s)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="speed"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpeedChart;
