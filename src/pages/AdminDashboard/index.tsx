/* eslint-disable @typescript-eslint/no-explicit-any */

import { Col, DatePicker, Divider, Row, Space } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AdminDashboardUserRation from "../../component/AdminDashboardUserRatio/AdminDashboardUserRation";
import AgentCard from "../../component/AgentCard/AgentCard";
import BookingChart from "../../component/BookingChart/BookingChart";
import DashboardCard from "../../component/DashboardCard";
import NoData from "../../component/NoData/NoData";
import ResTable from "../../component/Table";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi";
import {
  useGetTotalIncomesQuery,
  useTopLandlordIncomeQuery,
} from "../../redux/features/payments/paymentApi";
import { TCommonTheme } from "../../themes";
import style from "./dashboard.module.css";

type IRatioData = {
  name: string;
  value: number;
  color: string;
};
const AdminDashboard = () => {
  const { t } = useTranslation();
  const [year, setYear] = useState(moment().format("yyyy"));
  const [incomeData, setIncomeData] = useState([]);
  const [topAgentData, setTopAgentData] = useState([]);
  const [users, setUsers] = useState([]);
  const [userRatio, setUserRatio] = useState<IRatioData[] | []>([]);

  const query: Record<string, any> = {};
  const userQuery: Record<string, any> = {};
  userQuery["limit"] = 9999999999;

  query["year"] = year;
  const { data, isSuccess } = useGetTotalIncomesQuery({ ...query });
  const { data: topAgent, isSuccess: topAgentSuccess } =
    useTopLandlordIncomeQuery({ ...query });
  const { data: userData, isSuccess: userSuccess } = useGetAllUserQuery({
    ...userQuery,
  });

  const dashboardBookingColumn = [
    {
      title: t("User Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("Joining Date"),
      dataIndex: "createdAt",
      key: "date",
      render: (data: any) => {
        return moment(data).format().slice(0, 10);
      },
    },
    {
      title: t("Type"),
      dataIndex: "role",
      key: "type",
      render: (data: any) => {
        return (data === "user" && "tenants") || data;
      },
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      setIncomeData(data?.data);
    }
    if (userSuccess) {
      setUsers(userData?.data?.data);
    }
    if (topAgentSuccess) {
      setTopAgentData(topAgent?.data);
    }

    if (users?.length > 0) {
      const landlord = users.filter(
        (user: any) => user?.role === "landlord"
      )?.length;
      const tenants = users.filter(
        (user: any) => user?.role === "user"
      )?.length;

      setUserRatio([
        {
          name: "Guest User",
          value: tenants,
          color: "#F39200",
        },
        {
          name: "Host User",
          value: landlord,
          color: "#925800",
        },
      ]);
    }
  }, [
    data,
    isSuccess,
    topAgent?.data,
    topAgentSuccess,
    userData,
    userSuccess,
    users,
  ]);
  
console.log(userRatio)
  return (
    <div className="container mx-auto">
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <div className="mb-4">
            <DashboardCard incomeData={incomeData} />
          </div>
          <div className="bg-white p-2 rounded">
            <div className="flex items-center justify-between px-2 mb-4">
              <div>
                <h1 className="text-black font-600 text-20 ">
                  {t("Overview")}
                </h1>
              </div>
              <Space className="text-black font-500 flex flex-col items-start">
                <p>{t("Select Year")}</p>
                <DatePicker
                  className="w-[120px]"
                  onChange={(date, dateString) =>
                    setYear(moment(dateString).format("yyyy") as string)
                  }
                  picker="year"
                  defaultValue={dayjs(dayjs(), "YYYY")}
                />
              </Space>
            </div>
            {/* section 2 */}
            <BookingChart incomeData={incomeData} />
          </div>

          <div className="mt-4">
            <ResTable
              theme={TCommonTheme}
              scroll={{ x: 10, y: 240 }}
              column={dashboardBookingColumn}
              data={users}
            />
          </div>
        </Col>

        <Col span={8}>
          <div className="bg-white p-4 mb-4 rounded">
            <h1 className="text-20 font-500">{t("Top Users")}</h1>
            <div className="flex justify-between text-18 mt-4">
              <p>{t("User Name")}</p>
              <p>{t("Rents")}</p>
              <p>{t("Profit")}</p>
            </div>
            <Divider className="mt-2" />
            <div
              className={`overflow-y-auto h-[357px] pe-2 ${style.scrollbarCustom}`}
            >
              {topAgentData?.length > 0 ? (
                topAgentData.map((data, index) => (
                  <AgentCard key={index} data={data} />
                ))
              ) : (
                <NoData />
              )}
            </div>
          </div>
          <div className="bg-white p-4">
            <h1 className="text-16 font-500 ">{t("User Ratio")}</h1>
            {userRatio?.length > 0 ? (
              <AdminDashboardUserRation userRatio={userRatio} />
            ) : (
              <NoData />
            )}
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="h-[20px] w-[20px] bg-primary"></div>
                <h1 className="text-16 font-500">
                  {t("Tenants")} ({ userRatio?.length > 0 && userRatio[0].value })
                </h1>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="h-[20px] w-[20px] bg-[#925800]"></div>
                <h1 className="text-16 font-500">
                  {t("Landlords")} ({ userRatio?.length > 0 && userRatio[1].value })
                </h1>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
