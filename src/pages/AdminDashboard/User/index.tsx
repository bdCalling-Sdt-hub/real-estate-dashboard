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
import { userData } from "../../../db";
import UserDetails from "./UserDetails";

const User = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const handleToggleModal = () => {
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
   

  const column = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Joinning Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "User Type",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "action",

      render: (data: any, index: number) => { 
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
      label: <p>Tenant</p>,
    },
    {
      key: "2",
      label: <p>Landlord</p>,
    },
  ];
  return (
    <div className="container mx-auto">
      <ResModal
        width={1000}
        title="Booking Details"
        setShowModal={setShow}
        showModal={show}
      >
        <UserDetails />
      </ResModal>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-20 font-500 text-gray">Users List</h1>
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
              Filter
            </Button>
          </Dropdown>
        </div>
      </div>
      <ResTable
        column={column}
        data={userData}
        pagination={{ total: userData?.length, pageSize: 10 }}
      />
    </div>
  );
};

export default User;
