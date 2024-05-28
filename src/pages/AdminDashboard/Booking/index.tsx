/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { bookingData } from "../../../db";
import BookingDetails from "./BookingDetails";

const Booking = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleToggleModal = () => {
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };
  const column = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Proerty",
      dataIndex: "property",
      key: "property",
    },
    {
      title: "Owner Name",
      dataIndex: "owner",
      key: "owner",
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
      <h1 className="mb-4 font-500 text-20 text-gray">Booking Details</h1>
      <ResModal
        width={1000}
        title="Booking Details"
        setShowModal={setShow}
        showModal={show}
      >
        <BookingDetails />
      </ResModal>
      <ResTable
        column={column}
        data={bookingData}
        pagination={{ total: bookingData?.length, pageSize: 10 }}
      />
    </div>
  );
};

export default Booking;
