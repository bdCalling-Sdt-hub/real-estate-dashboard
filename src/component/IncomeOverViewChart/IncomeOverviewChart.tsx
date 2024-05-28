import { Col, DatePicker, Row } from "antd";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

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
          <div className="bg-white p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-20 font-500 text-gray">
                Total Income (Manager)
              </h1>
              <DatePicker picker="month" />
            </div>
            <ResponsiveContainer width="100%" height={261}>
              <PieChart width={730} height={250}>
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
                  Basic Manager:($5,621)
                </h1>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="bg-gray h-[20px] w-[20px] rounded-full"></div>
                <h1 className="text-gray text-18 font-500 ">
                  {" "}
                  Elite Propty. Manager:($5,621)
                </h1>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IncomeOverviewChart;
