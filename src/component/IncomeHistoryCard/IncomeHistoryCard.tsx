/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { priceFormat } from "../../utils/Format";
 

const IncomeHistoryCard = ({
  todayIncome,
  totalIncome,
}: {
  totalIncome: any;
  todayIncome: any;
}) => {
  const { t } = useTranslation();
  return (
    <Row align="middle" justify="center" gutter={16}>
      <Col span={12}>
        <div className="bg-white flex justify-between items-center p-6 rounded">
          <div className="bg-[#EEEFFF] p-2 rounded-full">
            <RiMoneyDollarCircleLine size={45} color="#3A6FF8" />
          </div>
          <div>
            <h1 className="text-24 font-500 text-gray">{t("Today Income")}</h1>
            <h5 className="text-20 font-500 ">
              {priceFormat(parseInt(todayIncome))}
            </h5>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div className="bg-white flex justify-between items-center  p-6 rounded">
          <div className="bg-[#FFE6E1] p-2 rounded-full">
            <RiMoneyDollarCircleLine size={45} color="#FF8E26" />
          </div>
          <div>
            <h1 className="text-24 font-500 text-gray">{t("Total Income")}</h1>
            <h5 className="text-20 font-500 ">
              {priceFormat(parseInt(totalIncome))}
            </h5>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default IncomeHistoryCard;
