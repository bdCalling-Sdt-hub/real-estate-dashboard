/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, DatePicker, Row, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import {
  usePackageStatisticsIncomesQuery,
  usePercentageStatisticsIncomeQuery,
} from "../../redux/features/payments/paymentApi";
import moment, { Moment } from "moment";
import { priceFormat } from "../../utils/Format";
import NoData from "../NoData/NoData";

type IData = {
  totalIncome: number;
  packageName: string;
  color?: string;
};

const IncomeOverviewChart = () => {
  const { t } = useTranslation();
  const [year, setYear] = useState<Moment | string>(moment().format("yyyy"));
  const [month, setMonth] = useState<Moment | string>(moment().format("MM"));
  const [percentageIncomeYear, setPercentageIncomeYear] = useState(
    moment().format("yyyy")
  );
  const [percentageIncomeData, setPercentageIncomeData] = useState([]);
  const [packageCalculationsData, setPackageCalculationsData] = useState<
    IData[] | []
  >([]);

  const percentageQuery: Record<string, any> = {};
  const packageCalculationsQuery: Record<string, any> = {};

  percentageQuery["year"] = percentageIncomeYear;
  packageCalculationsQuery["month"] = month;
  packageCalculationsQuery["year"] = year;

  const { data: percentage, isSuccess: percentageSuccess } =
    usePercentageStatisticsIncomeQuery({
      ...percentageQuery,
    });

  const { data: packageCalculations, isSuccess: packageCalculationsSuccess } =
    usePackageStatisticsIncomesQuery({
      ...packageCalculationsQuery,
    });

  useEffect(() => {
    if (percentageSuccess) {
      setPercentageIncomeData(percentage?.data?.monthlyIncome);
    }
    if (packageCalculationsSuccess) {
      console.log(packageCalculations?.data);

      setPackageCalculationsData(packageCalculations?.data);
    }
  }, [
    packageCalculations,
    packageCalculationsSuccess,
    percentage,
    percentageSuccess,
  ]);

  return (
    <div>
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <div className="bg-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-20 font-500 text-gray">
                {t("Total Income (Host)")}
              </h1>
              <DatePicker
                picker="month"
                onChange={(date, dateString) => {
                  setMonth(moment(dateString).format("MM"));
                  setYear(moment(dateString).format("yyyy"));
                }}
              />
            </div>
            {packageCalculationsData?.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height={261}>
                  <PieChart width={730} height={200}>
                    <Pie
                      data={packageCalculationsData}
                      dataKey="totalIncome"
                      nameKey="packageName"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      label
                    >
                      {packageCalculationsData?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#F39200" : "#575858"}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-between">
                  {packageCalculationsData?.map(
                    (entry: IData, index: number) => (
                      <div className="flex items-center gap-x-2">
                        <div
                          className={`${
                            index === 0 ? "bg-primary" : "bg-gray"
                          } h-[20px] w-[20px] rounded-full`}
                        ></div>
                        <h1
                          className={`${
                            index === 0 ? "text-primary" : "text-gray"
                          } text-18 font-500 `}
                        >
                          {t(entry?.packageName)}:(
                          {priceFormat(entry?.totalIncome)})
                        </h1>
                      </div>
                    )
                  )}
                </div>
              </>
            ) : (
              <NoData />
            )}
          </div>
        </Col>
        <Col span={24}>
          <div className="bg-white p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-20 font-500 text-gray mb-4">
                {t("Income Statistics (Percentage)")}
              </h1>
              <DatePicker
                picker="year"
                onChange={(date, dateString) =>
                  setPercentageIncomeYear(moment(dateString).format("yyyy"))
                }
              />
            </div>
            <ResponsiveContainer width="100%" height={305}>
              <BarChart data={percentageIncomeData}>
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
                  dataKey="income"
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
