/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, DatePicker, Row, Space } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { dashboardBookingColumn } from "../../Columns";
import BookingChart from "../../component/BookingChart/BookingChart";
import DashboardCard from "../../component/DashboardCard";
import ResTable from "../../component/Table";
import { dashboardBookingColumnData } from "../../db";
import { TCommonTheme } from "../../themes";

const AdminDashboard = () => {
  const [year, setYear] = useState(dayjs().format("YYYY"));
  console.log(year);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <div className="mb-4">
            <DashboardCard />
          </div>
          <div className="bg-white p-2 rounded">
            <div className="flex items-center justify-between px-2 mb-4">
              <div>
                <h1 className="text-black font-600 text-20 ">Overview</h1>
              </div>
              <Space className="text-black font-500 flex flex-col items-start">
                <p>Select Year</p>
                <DatePicker
                  onChange={(date, dateString) => setYear(dateString as string)}
                  picker="year"
                  defaultValue={dayjs(dayjs(), "YYYY")}
                />
              </Space>
            </div>
            {/* section 2 */}
            <BookingChart />
          </div>
          <div className="mt-4">
            <ResTable
              theme={TCommonTheme}
              scroll={{ x: 10, y: 240 }}
              column={dashboardBookingColumn}
              data={dashboardBookingColumnData}
            />
          </div>
        </Col>
        <Col span={8}>
          <h1>ss</h1>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
