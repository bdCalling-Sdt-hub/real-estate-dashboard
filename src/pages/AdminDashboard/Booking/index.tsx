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
import { IoCloudDownloadOutline } from "react-icons/io5"; 
import { useAppSelector } from "../../../redux/hooks";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
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
  const token: string | null = useAppSelector(useCurrentToken);

  const onPaginationChange = (page: any, pageSize: any) => {
    setPage(page);
    setLimit(pageSize);
  };
const handelToDownLoad =async(id:string)=>{
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/bookings/generate-contract/${id}`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    const data = await res.json()
    toast.success(data?.message, {id:"doc", duration: 3000});
   if(data?.success){
    window.open(data?.data, '_blank');
   } 
  } catch (error) {
    ErrorResponse(error, "doc")
    
  }
}
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
          <div className="flex items-center justify-center gap-5">
            <img
              className="text-18 cursor-pointer"
              src={info}
              alt=""
              onClick={handleToggleModal}
            />
            <button onClick={()=>handelToDownLoad(data?._id)}>

<IoCloudDownloadOutline size={22} />
            </button>

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
