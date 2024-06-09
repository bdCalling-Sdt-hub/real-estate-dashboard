import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { FaWallet } from "react-icons/fa6";
import { MdApartment } from "react-icons/md";

const DashboardCard = () => {
  const { t } = useTranslation();
  return (
    <Row align="middle" justify="center" gutter={16}>
      <Col span={12}>
        <div className="bg-white flex justify-between items-center p-6 rounded">
          <div className="bg-[#EEEFFF] p-2 rounded-full">
            <MdApartment size={45} color="#3A6FF8" />
          </div>
          <div>
            <h1 className="text-24 font-500 text-gray">
              {t("Total Properties")}
            </h1>
            <h5 className="text-20 font-500 ">5000</h5>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div className="bg-white flex justify-between items-center  p-6 rounded">
          <div className="bg-[#FFE6E1] p-2 rounded-full">
            <FaWallet size={45} color="#FF8E26" />
          </div>
          <div>
            <h1 className="text-24 font-500 text-gray">{t("Total Income")}</h1>
            <h5 className="text-20 font-500 ">5000</h5>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default DashboardCard;
