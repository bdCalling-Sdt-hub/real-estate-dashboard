/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { propertyData } from "../../../db/propertyData";
import PropertyDetails from "./PropertyDetails";

const Property = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleToggleModal = () => {
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };
  const column = [
    {
      title: "Property Name",
      dataIndex: "property",
      key: "property",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Owner Name",
      dataIndex: "agent",
      key: "agent",
    },
    {
      title: "action",

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
      <h1 className="text-20 mb-2 font-500 text-gray">Property Information</h1>
      <ResModal
        width={1000}
        title="Booking Details"
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
