/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, DatePicker, Divider, Row, Space } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { dashboardBookingColumn } from "../../Columns";
import AdminDashboardUserRation from "../../component/AdminDashboardUserRatio/AdminDashboardUserRation";
import AgentCard from "../../component/AgentCard/AgentCard";
import BookingChart from "../../component/BookingChart/BookingChart";
import DashboardCard from "../../component/DashboardCard";
import ResTable from "../../component/Table";
import { agentData, dashboardBookingColumnData } from "../../db";
import { TCommonTheme } from "../../themes";
import style from "./dashboard.module.css";
const AdminDashboard = () => {
  const { t } = useTranslation();
  const [year, setYear] = useState(dayjs().format("YYYY"));
  console.log(year);
  return (
    <div className="container mx-auto">
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
          <div className="bg-white p-4 mb-4 rounded">
            <h1 className="text-20 font-500">{t("greeting")}</h1>
            <div className="flex justify-between text-18 mt-4">
              <p>Agent Name</p>
              <p>Total Rent</p>
              <p>Profit</p>
            </div>
            <Divider className="mt-2" />
            <div
              className={`overflow-y-auto h-[357px] pe-2 ${style.scrollbarCustom}`}
            >
              {agentData?.map((data) => (
                <AgentCard data={data} />
              ))}
            </div>
          </div>
          <div className="bg-white p-4">
            <h1 className="text-16 font-500 ">User Ratio</h1>
            <AdminDashboardUserRation />
            <div className="flex justify-between ">
              <div className="flex  items-center gap-x-2">
                <div className="h-[20px] w-[20px] bg-primary  "></div>
                <h1 className="text-16 font-500">Guest User (40%)</h1>
              </div>

              <div className="flex  items-center gap-x-2">
                <div className="h-[20px] w-[20px] bg-[#925800]  "></div>
                <h1 className="text-16 font-500">Host User (40%)</h1>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
