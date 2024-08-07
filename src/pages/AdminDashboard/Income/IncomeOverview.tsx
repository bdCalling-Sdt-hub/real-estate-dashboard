/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, DatePicker, Row, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
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
import { usePackageStatisticsIncomeQuery } from "../../../redux/features/payments/paymentApi";
import { useEffect, useState } from "react";
import moment from "moment";

const IncomeOverview = () => {
  const [packageIncomeYear, setPackageIncomeYear] = useState(
    moment().format("yyyy")
  );
  const [packageIncomeData, setPackageIncomeData] = useState([]);

  const packageQuery: Record<string, any> = {};
  packageQuery["year"] = packageIncomeYear;

  const { data: packages, isSuccess: packageSuccess } =
    usePackageStatisticsIncomeQuery({
      ...packageQuery,
    });

  const { t } = useTranslation();

  useEffect(() => {
    if (packageSuccess) {
      setPackageIncomeData(packages?.data?.monthlyIncome);
    }
  }, [packageSuccess, packages]);

  return (
    <div className="container mx-auto">
      <h1 className="text-gray font-500 text-20 mb-2">
        {t("Income Overview")}
      </h1>
      <Row gutter={16}>
        <Col span={14}>
          <IncomeOVerviewCard />
          <div className="mt-4 bg-white pt-6 pe-6 rounded ">
            <div className="flex justify-between mb-4">
              <h1 className="font-500 text-20 text-gray ps-5 ">
                {t("Income Statistics (Packages)")}
              </h1>
              <DatePicker
                picker="year"
                onChange={(date, dateString) =>
                  setPackageIncomeYear(dateString.toString() as string)
                }
              />
            </div>
            <ResponsiveContainer width="100%" height={463}>
              <BarChart data={packageIncomeData}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F39200" />
                    <stop offset="100%" stopColor="#FBDDB0" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="income"
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
