import { Col, Row } from "antd";
import IncomeHistoryCard from "../../../component/IncomeHistoryCard/IncomeHistoryCard";
import ResTable from "../../../component/Table";
import { packagesData, percentageData } from "../../../db";

const IncomeHistory = () => {
  const column1 = [
    {
      title: "TransactionId",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
    },
  ];
  const column2 = [
    {
      title: "TransactionId",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
    },
    {
      title: "Package",
      dataIndex: "package",
      key: "package",
    },
  ];
  return (
    <div className="container mx-auto">
      <Row gutter={16}>
        <Col span={12}>
          <h1 className="text-gray font-500 text-20 mb-2">Percentage</h1>
          <IncomeHistoryCard />
          <div className="mt-2">
            <ResTable
              column={column1}
              data={percentageData}
              pagination={{ total: percentageData?.length, pageSize: 10 }}
            />
          </div>
        </Col>
        <Col span={12}>
          <h1 className="text-gray font-500 text-20 mb-2">Packages</h1>
          <IncomeHistoryCard />
          <div className="mt-2">
            <ResTable
              column={column2}
              data={packagesData}
              pagination={{ total: packagesData?.length, pageSize: 10 }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default IncomeHistory;
