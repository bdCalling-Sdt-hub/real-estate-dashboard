import { Col, DatePicker, Row, Tooltip } from "antd";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const data01 = [
  {
    name: "Guest User",
    value: 500,
    color: "#F39200",
  },
  {
    name: "Host User",
    value: 300,
    color: "#575858",
  },
];
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
const IncomeOverviewChart = () => {
  return (
    <div>
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <div className="bg-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-20 font-500 text-gray">
                Total Income (Host)
              </h1>
              <DatePicker picker="month" />
            </div>
            <ResponsiveContainer width="100%" height={261}>
              <PieChart width={730} height={200}>
                <Pie
                  data={data01}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  label
                >
                  {data01.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="bg-primary h-[20px] w-[20px] rounded-full"></div>
                <h1 className="text-primary text-18 font-500 ">
                  Basic Host:($5,621)
                </h1>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="bg-gray h-[20px] w-[20px] rounded-full"></div>
                <h1 className="text-gray text-18 font-500 ">
                  Super Host:($5,621)
                </h1>
              </div>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div className="bg-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-20 font-500 text-gray mb-4">
                Income Statics(Percentage)
              </h1>
              <DatePicker picker="month" />
            </div>
            <ResponsiveContainer width="100%" height={305}>
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
      </Row>
    </div>
  );
};

export default IncomeOverviewChart;
