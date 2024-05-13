/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Col, Space, DatePicker } from "antd";
import BookingChart from "../../component/BookingChart/BookingChart";
import { useState } from "react";
import dayjs from "dayjs";
import DashboardCard from "../../component/DashboardCard";
import ResTable from "../../component/Table";
import { dashboardBookingColumn } from "../../Columns";
import { dashboardBookingColumnData } from "../../db";
import { TCommonTheme } from "../../themes";

const VendorDashboard = () => {
  const [year, setYear] = useState(dayjs().format("YYYY"));
  console.log(year);
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <div className="bg-white  p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-black font-600 text-32">Booking Statics</h1>
                <p className="text-18 text-deepGray">
                  Here are the booking statistics broken down by month.
                </p>
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
        </Col>
        <Col span={8}>
          <DashboardCard />
        </Col>
      </Row>

      <div>
        <h1 className="my-2 text-20 font-600">Recent request</h1>
        <ResTable
          theme={TCommonTheme}
          scroll={{ x: 10, y: 310 }}
          column={dashboardBookingColumn}
          data={dashboardBookingColumnData}
        />
      </div>
    </div>
  );
};

export default VendorDashboard;
