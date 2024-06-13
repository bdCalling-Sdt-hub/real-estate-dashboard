/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined, FilterOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, MenuProps } from "antd";
import { SearchProps } from "antd/es/input";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdBlock } from "react-icons/md";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import ResConfirm from "../../../component/UI/PopConfirm";
import { hostData, userData } from "../../../db";
import HostDetails from "./HostDetails";

const Host = () => {
  const [show, setShow] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleToggleModal = () => {
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const column = [
    {
      title: t("Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Joining Date"),
      dataIndex: "date",
      key: "date",
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("Contact No"),
      dataIndex: "number",
      key: "number",
    },
    {
      title: t("Address"),
      dataIndex: "address",
      key: "address",
    },
    {
      title: t("User Type"),
      dataIndex: "role",
      key: "role",
    },
    {
      title: t("Account Status"),
      dataIndex: "status",
      key: "status", // Corrected the key to "status"
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
            <ResConfirm>
              <MdBlock className="text-18 cursor-pointer" color="red" />
            </ResConfirm>
          </div>
        );
      },
    },
  ];
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p>{t("Verified")}</p>,
    },
    {
      key: "2",
      label: <p>{t("Not Verified")}</p>,
    },
  ];
  return (
    <div className="container mx-auto">
      <ResModal
        width={1000}
        // title="Host"
        setShowModal={setShow}
        showModal={show}
      >
        <HostDetails />
      </ResModal>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-20 font-500 text-gray">{t("Landlords List")}</h1>
        <div className="flex gap-x-2">
          <Input.Search
            style={{ width: 304 }}
            placeholder={t("search")}
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
      <ResTable
        column={column}
        data={hostData}
        pagination={{ total: userData?.length, pageSize: 10 }}
      />
    </div>
  );
};

export default Host;
