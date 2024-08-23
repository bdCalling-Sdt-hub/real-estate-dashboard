import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import income from "../../assets/income.png";
import properties from "../../assets/properties.png";
import { priceFormat } from "../../utils/Format";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DashboardCard = ({ incomeData }: { incomeData: any }) => {
  const { t } = useTranslation();
  return (
    <Row align="middle" justify="center" gutter={16}>
      <Col span={12}>
        <div className="bg-white flex justify-between items-center p-6 rounded shadow-sm">
          <div className=" p-2 rounded-full">
            <img src={properties} alt="" />
          </div>
          <div>
            <h1 className="text-24 font-500 text-gray">
              {t("Total Properties")}
            </h1>
            <h5 className="text-20 font-500 ">{incomeData?.properties}</h5>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div className="bg-white flex justify-between items-center  p-6 rounded shadow-sm">
          <div className=" p-2 rounded-full">
            <img src={income} alt="" />
          </div>
          <div>
            <h1 className="text-24 font-500 text-gray">{t("Total Income")}</h1>
            <h5 className="text-20 font-500 ">
              {priceFormat(incomeData?.totalIncome)}
            </h5>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DashboardCard;
