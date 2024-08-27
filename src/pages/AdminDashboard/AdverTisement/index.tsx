/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import deleteIcon from "../../../assets/delete.png";
import editIcon from "../../../assets/edit.png";
import ResModal from "../../../component/Modal/Modal";
import ResTable from "../../../component/Table";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import {
  useDeleteAdsMutation,
  useGetAllAdsQuery,
} from "../../../redux/features/ads/adsApi";
import CreateAds from "./CreateAds";
import EditAds from "./EditAds";
const AdverTisement = () => {
  const [show, setShow] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [deleteModal, setdeletemodal] = useState(false);
  const [id, setId] = useState();

  const { t } = useTranslation();
  const { data: adsData } = useGetAllAdsQuery({ limit: 99999 });
  const [deleteAds] = useDeleteAdsMutation();
  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      await deleteAds(id).unwrap();
      toast.success("Ads deleted succesfully", { id: toastId, duration: 2000 });
      setdeletemodal((prev: boolean) => !prev);
    } catch (error) {
      setdeletemodal((prev: boolean) => !prev);
      ErrorResponse(error, toastId);
    }
  };

  const column = [
    {
      title: t("Banner"),
      dataIndex: "banner",
      key: "banner",
      render: (data: string) => <img width={100} src={data} alt="" />,
    },
    {
      title: t("Link"),
      dataIndex: "contactLink",
      key: "contactLink",
    },
    {
      title: t("Category"),
      dataIndex: "category",
      key: "category",
      render: (data: any) => {
        return data?.name;
      },
    },

    // {
    //   title: t("End Date"),
    //   dataIndex: "expireAt",
    //   key: "endDate",
    //   render: (data: any) => {
    //     return moment(data?.expireAt).format().slice(0, 10);
    //   },
    // },

    {
      title: t("Action"),
      key: "action",
      render: (data: any) => {
        return (
          <div className="flex gap-x-2 ">
            <img
              className="cursor-pointer"
              src={editIcon}
              alt=""
              width={30}
              onClick={() => {
                setId(data?._id);
                setShowEditModal((prev: boolean) => !prev);
              }}
            />
            <img
              className="cursor-pointer"
              src={deleteIcon}
              alt=""
              width={30}
              onClick={() => {
                setId(data?._id);
                setdeletemodal((prev: boolean) => !prev);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto h-80 my-auto">
      <ResModal showModal={deleteModal} setShowModal={setdeletemodal}>
        <div className="flex flex-col items-center  justify-center ">
          <h1 className="text-20 font-500 mt-10">
            Sure you want to delete this Ads?
          </h1>

          <div className="flex gap-x-6 mt-10">
            <Button className="border text-20 h-[50px] w-[200px] font-500  border-[#64B5F6] rounded-full">
              No
            </Button>
            <Button
              onClick={() => handleDelete()}
              className="border text-20 h-[50px] w-[200px] font-500  bg-[#64B5F6] border-[#64B5F6] rounded-full text-white"
            >
              Yes
            </Button>
          </div>
        </div>
      </ResModal>
      <ResModal showModal={showEditModal} setShowModal={setShowEditModal}>
        <EditAds id={id} setShow={setShowEditModal} />
      </ResModal>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-20 font-500 text-gray">
          {t("Active Advertisement Listings")}
        </h1>
        <Button
          onClick={() => setShow((prev) => !prev)}
          className="bg-primary text-white "
        >
          Create Ads
        </Button>
      </div>
      <ResModal setShowModal={setShow} showModal={show}>
        <CreateAds setShow={setShow} />
      </ResModal>
      <ResTable
        column={column}
        data={adsData?.data?.data}
        pagination={{
          total: adsData?.data?.meta?.total,
          pageSize: 10,
        }}
      />
    </div>
  );
};

export default AdverTisement;
