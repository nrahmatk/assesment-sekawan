import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "0", Today: 10, Yesterday: 15 },
  { name: "1", Today: 15, Yesterday: 20 },
  { name: "2", Today: 25, Yesterday: 18 },
  { name: "3", Today: 20, Yesterday: 25 },
  { name: "4", Today: 30, Yesterday: 28 },
  { name: "5", Today: 22, Yesterday: 35 },
  { name: "6", Today: 28, Yesterday: 32 },
  { name: "7", Today: 35, Yesterday: 30 },
  { name: "8", Today: 40, Yesterday: 38 },
  { name: "9", Today: 38, Yesterday: 42 },
  { name: "10", Today: 45, Yesterday: 40 },
  { name: "11", Today: 50, Yesterday: 45 },
  { name: "12", Today: 55, Yesterday: 50 },
  { name: "13", Today: 60, Yesterday: 55 },
  { name: "14", Today: 38, Yesterday: 48 },
  { name: "15", Today: 45, Yesterday: 50 },
  { name: "16", Today: 50, Yesterday: 60 },
  { name: "17", Today: 48, Yesterday: 58 },
  { name: "18", Today: 52, Yesterday: 62 },
  { name: "19", Today: 55, Yesterday: 65 },
  { name: "20", Today: 60, Yesterday: 70 },
  { name: "21", Today: 65, Yesterday: 72 },
];

export default function ChartCoba() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Today"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Yesterday" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
