/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ResTable from "../../../component/Table";
import { vendorRestaurantData } from "../../../db";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Tag } from "antd";
import { useState } from "react";

const VendorRestaurant = () => {
  const [show, setshow] = useState<boolean>(false);
  const navigate = useNavigate();
  const column = [
    {
      title: "#SL",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Restaurant Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Total Tables",
      dataIndex: "totalTables",
      key: "totalTables",
    },
    {
      title: "Total Menus",
      dataIndex: "totalMenuItems",
      key: "totalMenuItems",
    },
    {
      title: "Status",
      key: "status",
      render: (data: any) => {
        return data.status === "active" ? (
          <Tag color="#4C9A29" className="cursor-pointer">
            Active
          </Tag>
        ) : (
          <Tag
            color="#ff0000
              "
            className="cursor-pointer"
          >
            Inactive
          </Tag>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (data: any, index: number) => {
        return (
          <div className="flex gap-x-4">
            <EditOutlined
              onClick={() => setshow((prev) => !prev)}
              className="cursor-pointer"
              key={index}
            />
            <NavLink to={`/contest-details/${1}`}>
              <EyeOutlined className="cursor-pointer" key={index} />
            </NavLink>
          </div>
        );
      },
    },
  ];

  const handleCreateRestaurant = () => {
    navigate("/vendor/create-restaurant");
  };
  return (
    <div>
      <h1>vendor restaurant</h1>
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleCreateRestaurant}
          className="bg-primary text-white font-500"
          icon={<PlusCircleOutlined />}
        >
          Create Restaurant
        </Button>
      </div>
      <ResTable
        column={column}
        data={vendorRestaurantData}
        loading={false}
        pagination={{ total: vendorRestaurantData.length, pageSize: 10 }}
      />
    </div>
  );
};

export default VendorRestaurant;
