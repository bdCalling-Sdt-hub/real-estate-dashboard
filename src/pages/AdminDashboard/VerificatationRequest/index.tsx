/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps } from "antd";
import { SearchProps } from "antd/es/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { verificationData } from "../../../db";
import VerificatonDetails from "./VerificationDetails";

const VerificationRequest = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p>{t("Tenant")}</p>,
    },
    {
      key: "2",
      label: <p>{t("Landlord")}</p>,
    },
  ];
  const handleToggleModal = () => {
    setShow((prev: boolean) => !prev);
  };
  const column = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Request Date"),
      dataIndex: "date",
      key: "date",
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("User Type"),
      dataIndex: "role",
      key: "role",
    },
    {
      title: t("Action"),
      render: (data: any, index: number) => {
        console.log(data, index);
        return (
          <div className="flex items-center gap-x-2">
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
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-20 font-500 text-gray mb-1">
          {t("Verification Requests")}
        </h1>
        <div className="flex gap-x-2">
          <Input.Search
            style={{ width: 304 }}
            placeholder={t("Search")}
            allowClear
            onSearch={onSearch}
          />
          <Dropdown menu={{ items }} placement="bottomLeft">
            <Button
              className="bg-primary text-white font-500 "
              icon={<FilterOutlined />}
            >
              {t("Filter")}
            </Button>
          </Dropdown>
        </div>
      </div>
      <ResModal
        showModal={show}
        setShowModal={setShow}
        width={1000}
        title="Verification Information"
      >
        <VerificatonDetails />
      </ResModal>

      <ResTable column={column} data={verificationData} />
    </div>
  );
};

export default VerificationRequest;
