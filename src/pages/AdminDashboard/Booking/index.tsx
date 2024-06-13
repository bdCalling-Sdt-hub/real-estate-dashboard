/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { bookingData } from "../../../db";
import BookingDetails from "./BookingDetails";

const Booking = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const handleToggleModal = () => {
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };

  const column = [
    {
      title: t("ID"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("Date"),
      dataIndex: "date",
      key: "date",
    },
    {
      title: t("User Name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("Property"),
      dataIndex: "property",
      key: "property",
    },
    {
      title: t("Landlord Name"),
      dataIndex: "owner",
      key: "owner",
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
        <h1 className="mb-4 font-500 text-20 text-gray">
          {t("Reservations Details")}
        </h1>
      </div>
      <ResModal
        width={1000}
        title={t("Reservations Details")}
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
