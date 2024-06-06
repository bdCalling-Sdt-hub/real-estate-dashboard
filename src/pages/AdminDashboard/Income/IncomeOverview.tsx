import { Col, DatePicker, Row, Tooltip } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import IncomeOverviewChart from "../../../component/IncomeOverViewChart/IncomeOverviewChart";
import IncomeOVerviewCard from "../../../component/OverViewCard/IncomeOVerviewCard";
const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Jun",
    pv: 3800,
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Aug",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Sept",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
  },
];

const IncomeOverview = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-gray font-500 text-20 mb-2">Income Overview</h1>
      <Row gutter={16}>
        <Col span={14}>
          <IncomeOVerviewCard />
          <div className="mt-4 bg-white pt-6 pe-6 rounded ">
            <div className="flex justify-between mb-4">
              <h1 className="font-500 text-20 text-gray ps-5 ">
                Income Statics(Packages)
              </h1>
              <DatePicker picker="month" />
            </div>
            <ResponsiveContainer width="100%" height={463}>
              <BarChart data={data}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F39200" />
                    <stop offset="100%" stopColor="#FBDDB0" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="pv"
                  fill="url(#colorPv)"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col span={10}>
          <IncomeOverviewChart />
        </Col>
      </Row>
    </div>
  );
};

export default IncomeOverview;
