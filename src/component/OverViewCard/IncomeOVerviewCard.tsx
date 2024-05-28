import { Col, Row } from "antd";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const IncomeOVerviewCard = () => {
  return (
    <Row align="middle" justify="center" gutter={16}>
      <Col span={12}>
        <div className="bg-white flex justify-between items-center py-10 px-4 rounded">
          <div className="bg-[#EEEFFF] p-2 rounded-full">
            <RiMoneyDollarCircleLine size={100} color="#3A6FF8" />
          </div>
          <div className="text-center">
            <h1 className="text-30 font-700 text-gray">Today Income</h1>
            <h5 className="text-32 font-500">$5000K</h5>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div className="bg-white flex justify-between items-center py-10 px-4 rounded">
          <div className="bg-[#EEEFFF] p-2 rounded-full">
            <RiMoneyDollarCircleLine size={100} color="#FF8E26" />
          </div>
          <div className="text-center">
            <h1 className="text-30 font-700 text-gray">Total Income</h1>
            <h5 className="text-32 font-500">$5000K</h5>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default IncomeOVerviewCard;
