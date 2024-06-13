import { Button, Divider, Image } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsCheck2Circle } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import ResModal from "../../../component/Modal/Modal";
import RejectForm from "../../../component/RejectForm/RejectForm";
import drivingLicense from "./../../../assets/driving.jfif";
import nid from "./../../../assets/nid front part.jfif";
import passport from "./../../../assets/passport.jfif";
const VerificatonDetails = () => {
  const { t } = useTranslation();
  const [ShowrejectModal, setShowrejectModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setShowrejectModal((prev) => !prev);
  };
  return (
    <div>
      <ResModal
        showModal={ShowrejectModal}
        setShowModal={handleOpenModal}
        title={t("Rejection Reason")}
      >
        <RejectForm />
      </ResModal>
      <h1 className="text-30 font-500">{t("Verification Details")}</h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <Image src={nid} alt="" />
        <Image src={passport} alt="" />
        <Image src={drivingLicense} alt="" />
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-20 font-500"></h1>
          <div className="mt-1 text-gray">
            <p>{t("Name")}: Mr Opu Khan</p>
            <p className="my-1">{t("User Type")}: Tenant</p>
            <p>{t("Joining Date")}: August 24 2024</p>
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
          >
            {t("Accept")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificatonDetails;
