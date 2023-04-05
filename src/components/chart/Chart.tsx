import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { Product,isMobile } from "../../types";
import CustomTick from "./CustomTick";
import "./Chart.css";

interface ChartProps {
  data: Product[];
}
const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <LineChart
      width={isMobile ? 300 : 1000}
      height={isMobile ? 400 : 600}
      data={data}
      margin={{
        top: 25,
        bottom: 45,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="title"
        height={isMobile ? 60 : 120}
        interval={isMobile ? 1 : 0}
        tick={(props) => <CustomTick {...props} textLengthLimit={13} />}
        padding={{ left: isMobile ? 20 : 50, right: isMobile ? 20 : 50 }}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#000"
        name="Price"
        strokeWidth={3}
      />
      <Line
        type="monotone"
        dataKey="discountedPricePerPiece"
        stroke="#2450a9"
        name="Discounted price"
        strokeWidth={3}
      />
    </LineChart>
  );
};

export default Chart;
