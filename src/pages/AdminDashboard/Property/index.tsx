/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { propertyData } from "../../../db/propertyData";
import PropertyDetails from "./PropertyDetails";

const Property = () => {
  const [show, setShow] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleToggleModal = () => {
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p>{t("Apartment")}</p>,
    },
    {
      key: "2",
      label: <p>{t("House")}</p>,
    },
    {
      key: "3",
      label: <p>{t("Chalet")}</p>,
    },
    {
      key: "4",
      label: <p>{t("Farm")}</p>,
    },
    {
      key: "5",
      label: <p>{t("Land")}</p>,
    },
    {
      key: "6",
      label: <p>{t("Commercial")}</p>,
    },
  ];
  const column = [
    {
      title: t("Property Name"),
      dataIndex: "property",
      key: "property",
    },
    {
      title: t("Price"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: t("Category"),
      dataIndex: "category",
      key: "category",
    },
    {
      title: t("Address"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("Landlord Name"),
      dataIndex: "agent",
      key: "agent",
    },
    {
      title: t("Action"),
      key: "action",
      render: (data: any, index: number) => {
        console.log(data, index);
        return (
          <div>
            <EyeOutlined
              className="text-18 cursor-pointer"
              onClick={handleToggleModal}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto h-80 my-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-20 mb-2 font-500 text-gray">{t("Real Estate")}</h1>
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Button
            className="bg-primary text-white font-500 "
            icon={<FilterOutlined />}
          >
            {t("Filter")}
          </Button>
        </Dropdown>
      </div>
      <ResModal
        width={1000}
        title={t("Real estate details")}
        setShowModal={setShow}
        showModal={show}
      >
        <PropertyDetails />
      </ResModal>
      <ResTable
        column={column}
        data={propertyData}
        pagination={{ total: propertyData?.length, pageSize: 10 }}
      />
    </div>
  );
};

export default Property;
