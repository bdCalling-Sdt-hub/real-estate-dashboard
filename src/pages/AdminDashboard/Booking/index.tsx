/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import BookingDetails from "./BookingDetails";
import { useGetAllBookingQuery } from "../../../redux/features/booking/bookingApi";
import moment from "moment";
import { render } from "react-dom";
import { CgLayoutGrid } from "react-icons/cg";

const Booking = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const handleToggleModal = () => {
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [bookings, setBookings] = useState([]);

  query["limit"] = limit;
  query["page"] = page;
  query["isPaid"] = true;
  const { data: data, isSuccess } = useGetAllBookingQuery({ ...query });

  const [modalData, setModalData] = useState({});
  const startIndex = (page - 1) * limit;
  useEffect(() => {
    if (isSuccess) {
      setBookings(data?.data?.data);
    }
  }, [isSuccess, data]);

  const onPaginationChange = (page: any, pageSize: any) => {
    setPage(page);
    setLimit(pageSize);
  };

  const column = [
    {
      title: t("ID"),

      dataIndex: "key",

      key: "id",
      render:(data:any, record:any, index:any)=>{   
        return startIndex + index + 1
      },
    },
    {
      title: t("Date"),
      dataIndex: "date",
      key: "date",
      render: (data: any) => {
        return moment(data?.startAt).format("LL");
      },
    },
    {
      title: t("User Name"),
      dataIndex: "user",
      key: "user",
      render: (data: any) => { 
        return data?.name;
      },
    },
    {
      title: t("Property"),
      dataIndex: "residence",
      key: "property",
      render: (data: any) => {
        return data?.propertyName;
      },
    },
    {
      title: t("Landlord Name"),
      dataIndex: "author",
      key: "author",
      render: (data: any) => { 
        return data?.name;
      },
    },
    {
      title: t("Action"),
      key: "action",
      render: (data: any) => {
        setModalData(data); 
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
  console.log("--------------",new Date());

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
        <BookingDetails modalData={modalData} />
      </ResModal>
      <ResTable
        column={column}
        data={bookings}
        pagination={{
          total: data?.data?.meta?.total || 0,
          pageSize: limit || 10,
          onChange: onPaginationChange,
          showSizeChanger: true,
        }}

        // pagination={{ total: bookingData?.length, pageSize: 10 }}
      />
    </div>
  );
};

export default Booking;
