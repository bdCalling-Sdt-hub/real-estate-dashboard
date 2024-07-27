/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip } from "antd";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
const BookingChart = ({ incomeData }: { incomeData: any }) => {
   
  return (
    <ResponsiveContainer width="100%" height={270}>
      <LineChart
        width={500}
        height={300}
        data={incomeData?.monthlyIncome}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#3A6FF8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BookingChart;
