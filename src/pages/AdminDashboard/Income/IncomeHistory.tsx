/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import IncomeHistoryCard from "../../../component/IncomeHistoryCard/IncomeHistoryCard";
import ResTable from "../../../component/Table"; 
import {
  useGetPackageIncomeQuery,
  useGetPercentageIncomeQuery,
} from "../../../redux/features/payments/paymentApi";
import { useEffect, useState } from "react";
import moment from "moment";
import { priceFormat } from "../../../utils/Format";

const IncomeHistory = () => {
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

  const { data: packageIncome, isSuccess } = useGetPackageIncomeQuery({});
  const { data: percentageIncome, isSuccess: success } =
    useGetPercentageIncomeQuery({});

  useEffect(() => {
    if (isSuccess) {
      setPackagesData(packageIncome?.data);
    }
    if (success) {
      setPercentageData(percentageIncome?.data);
    }
  }, [
    isSuccess,
    packageIncome,
    setPackagesData,
    success,
    setPercentageData,
    percentageIncome,
  ]); 
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
    {
      title: t("Percentage"),
      dataIndex: "adminAmount",
      key: "Percentage",
      render: (data: any) => {
        return priceFormat(data);
      },
    },
    {
      title: t("Landlord Amount"),
      dataIndex: "landlordAmount",
      key: "amount",
      render: (data: any) => {
        return priceFormat(data);
      },
    },
    {
      title: t("Landlord"),
      dataIndex: "residenceAuthority",
      key: "Landlord",
      render: (data: any) => {
        return data?.name;
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
    {
      title: t("User"),
      dataIndex: "user",
      key: "sender",
      render: (data: any) => {
        return data?.name;
      },
    },
    {
      title: t("Package"),
      dataIndex: "details",
      key: "package",
      render: (data: any) => {
        return data?.package?.name;
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <Row gutter={16}>
        <Col span={12}>
          <h1 className="text-gray font-500 text-20 mb-2">{t("Percentage")}</h1>
          <IncomeHistoryCard
            totalIncome={percentageData?.totalIncome}
            todayIncome={percentageData?.todayIncome}
          />
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
        <Col span={12}>
          <h1 className="text-gray font-500 text-20 mb-2">{t("Packages")}</h1>
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
        </Col>
      </Row>
    </div>
  );
};

export default IncomeHistory;
