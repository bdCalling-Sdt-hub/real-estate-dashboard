/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import info from "../../../assets/info.png";
import IncomeHistoryCard from "../../../component/IncomeHistoryCard/IncomeHistoryCard";
import ResTable from "../../../component/Table";
import { useGetAllTransitionsQuery } from "../../../redux/features/payments/paymentApi";
import { priceFormat } from "../../../utils/Format";
const IncomeHistory = () => {
  const [show, setshow] = useState(false);
  const handleToggleModal = () => {
    setshow(true);
  };

  const { t } = useTranslation();
  const [packagesData, setPackagesData] = useState({
    totalIncome: 0,
    todayIncome: 0,
    totalPaymentsList: [],
  });
  const [percentageData, setPercentageData] = useState({
    totalIncome: 0,
    todayIncome: 0,
    totalPaymentsList: [],
  });

  const percentageQuery: Record<string, any> = {};
  const adsQuery: Record<string, any> = {};
  percentageQuery["type"] = "BookingResidence";
  adsQuery["type"] = "Ads";

  const { data: adsIncome, isSuccess } = useGetAllTransitionsQuery(adsQuery);
  console.log(adsIncome);
  const { data: percentageIncome, isSuccess: success } =
    useGetAllTransitionsQuery(percentageQuery);

  useEffect(() => {
    if (isSuccess) {
      setPackagesData(adsIncome?.data);
    }
    if (success) {
      setPercentageData(percentageIncome?.data);
    }
  }, [isSuccess, success]);

  const column1 = [
    {
      title: t("TXN ID"),
      dataIndex: "transitionId",
      key: "id",
    },
    {
      title: t("Date"),
      dataIndex: "transitionDate",
      key: "date",
      render: (data: any) => {
        return moment(data).format().slice(0, 10);
      },
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      key: "amount",
      render: (data: any) => {
        return priceFormat(data);
      },
    },
    // {
    //   title: t("Percentage"),
    //   dataIndex: "adminAmount",
    //   key: "Percentage",
    //   render: (data: any) => {
    //     return priceFormat(data);
    //   },
    // },
    // {
    //   title: t("Landlord Amount"),
    //   dataIndex: "landlordAmount",
    //   key: "amount",
    //   render: (data: any) => {
    //     return priceFormat(data);
    //   },
    // },
    {
      title: t("Action"),
      render: (data: any, index: number) => {
        return (
          <div className="flex items-center gap-x-2">
            <img
              className="cursor-pointer"
              src={info}
              onClick={() => {
                handleToggleModal();
              }}
            />
          </div>
        );
      },
    },
  ];

  const column2 = [
    {
      title: t("TXN ID"),
      dataIndex: "transitionId",
      key: "id",
    },
    {
      title: t("Pay At"),
      dataIndex: "transitionDate",
      key: "date",
      render: (data: any) => {
        return moment(data).format().slice(0, 10);
      },
    },
    {
      title: t("Amount"),
      dataIndex: "amount",
      key: "amount",
      render: (data: any) => {
        return priceFormat(data);
      },
    },
    {
      title: t("StartAt"),
      dataIndex: "details",
      key: "details",
      render: (data: any) => {
        return moment(data?.startAt).format().slice(0, 10);
      },
    },
    {
      title: t("StartAt"),
      dataIndex: "details",
      key: "details",
      render: (data: any) => {
        return moment(data?.endAt).format().slice(0, 10);
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-gray font-500 text-20 mb-2">
        {t("Percentage Transitions")}
      </h1>
      <IncomeHistoryCard
        totalIncome={percentageData?.totalIncome}
        todayIncome={percentageData?.todayIncome}
      />
      <Row gutter={16}>
        <Col span={24}>
          <div className="mt-2">
            <ResTable
              column={column1}
              data={percentageData?.totalPaymentsList}
              pagination={{
                total: percentageData?.totalPaymentsList?.length,
                pageSize: 10,
              }}
            />
          </div>
        </Col>
        {/* <Col span={12}>
          <h1 className="text-gray font-500 text-20 mb-2">
            {t("Ads Transitions")}
          </h1>
          <IncomeHistoryCard
            totalIncome={packagesData?.totalIncome}
            todayIncome={packagesData?.todayIncome}
          />
          <div className="mt-2">
            <ResTable
              column={column2}
              data={packagesData?.totalPaymentsList}
              pagination={{
                total: packagesData?.totalPaymentsList?.length,
                pageSize: 10,
              }}
            />
          </div>
        </Col> */}
      </Row>
    </div>
  );
};

export default IncomeHistory;
