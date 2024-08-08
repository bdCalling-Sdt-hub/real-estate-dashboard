/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Image } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsCheck2Circle } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import ResModal from "../../../component/Modal/Modal";
import RejectForm from "../../../component/RejectForm/RejectForm";
import drivingLicense from "./../../../assets/driving.jfif";
import moment from "moment";
import { useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { CgLayoutGrid } from "react-icons/cg";
const VerificatonDetails = ({
  modalData,
  setShow,
}: {
  modalData: any;
  setShow: any;
}) => {
  const [updateUserFn] = useUpdateUserMutation();
  const { t } = useTranslation();
  const [ShowrejectModal, setShowrejectModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowrejectModal((prev) => !prev);
  };

  const handelToAcceptRequest = async (id: string) => {
    toast.loading("Request accepting...", { id: "accept" });
    try {
      const res: any = await updateUserFn({
        id,
        body: { verificationRequest: "accepted", isVerified: true },
      }).unwrap(); 
      if (res.success) {
        toast.success(t("user verifications accepted"), { id: "accept" });
        setShow((prev: any) => !prev);
      }else{
        toast.success(res.message, { id: "accept" });
      }
    } catch (error) {
      ErrorResponse(error, "accept");
    }
  };
 
  return (
    <div>
      <ResModal
        showModal={ShowrejectModal}
        setShowModal={handleOpenModal}
        title={t("Rejection Reason")}
      >
        <RejectForm id={modalData?._id} />
      </ResModal>
      <h1 className="text-30 font-500">{t("Verification Details")}</h1>
      <Divider />
      {/* section 2 */}
      <h1 className="text-32 font-semibold my-4">Selfie</h1>
      <Image
          className="object-cover"
          height={200}
          src={modalData?.documents?.selfie}
          alt="civilId frontSide"
        />

<h1 className="text-32 font-semibold my-4">Documents</h1>
      <div className="flex gap-x-4">
       
        {
          modalData?.documents?.documents?.length > 0 && modalData?.documents?.documents?.map((doc:any)=> <Image
          className="object-cover"
          height={200}
          src={doc?.url}
          alt="Documents"
        />)
        }
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-20 font-500"></h1>
          <div className="mt-1 text-gray">
            <p>
              {t("Name")}: {modalData?.name}
            </p>
            <p className="my-1">
              {t("User Type")}:{" "}
              {modalData?.role === "landlord" ? t("Landlord") : t("Tenant")}
            </p>
            <p>
              {t("Joining Date")}: {moment(modalData?.createdAt).format("LL")}
            </p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <Button
            onClick={handleOpenModal}
            icon={<MdCancel />}
            className="border-[#ff0000] flex items-center h-[40px] w-[100px] font-500 text-[#ff0000] "
          >
            {t("Reject")}
          </Button>
          <Button
            icon={<BsCheck2Circle />}
            className=" flex items-center h-[40px] w-[100px] font-500 bg-primary text-white   "
            onClick={() => handelToAcceptRequest(modalData?._id)}
          >
            {t("Accept")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificatonDetails;
