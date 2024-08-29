/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import info from "../../../assets/info.png";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import { useGetAllBookingQuery } from "../../../redux/features/booking/bookingApi";
import BookingDetails from "./BookingDetails";
const Booking = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(false);
  const handleToggleModal = () => {
    setShow((prevShow) => !prevShow); // Toggle the state using the previous state value
  };
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  query["limit"] = limit;
  query["page"] = page;
  query["isPaid"] = true;
  const {
    data: data,
    isFetching,
    isLoading,
  } = useGetAllBookingQuery({ ...query });
  const [modalData, setModalData] = useState({});
  const startIndex = (page - 1) * limit;
  console.log(data);
  const onPaginationChange = (page: any, pageSize: any) => {
    setPage(page);
    setLimit(pageSize);
  };

  const column = [
    {
      title: t("ID"),

      key: "id",
      render: (data: any) => {
        return <p>#{data?._id.slice(data?._id?.length - 8)}</p>;
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
      dataIndex: "residence",
      key: "residence",
      render: (data: any) => {
        return data?.host?.name;
      },
    },
    {
      title: t("Action"),
      key: "action",
      render: (data: any) => {
        setModalData(data);
        return (
          <div>
            <img
              className="text-18 cursor-pointer"
              src={info}
              alt=""
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
        <BookingDetails modalData={modalData} />
      </ResModal>
      <ResTable
        loading={isFetching || isLoading}
        column={column}
        data={data?.data?.data}
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
