/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { IoLocateOutline } from "react-icons/io5"; 
import moment from "moment";
import { NumberFormat } from "../../../utils/Format";
const GuestDetails = ({ modalData }: { modalData: any }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-30 font-500">{t("Tenant Information")}</h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <img src={modalData?.image} alt="" width={200} />
        <div>
          <h1 className="text-20 font-500">{modalData?.name}</h1>
          <div className="flex items-center gap-x-2 text-gray mt-2">
            <IoLocateOutline />
            <p>{modalData?.address}</p>
          </div>
        </div>
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-20 font-500">{t("Personal Preferrence")}</h1>
          <div className="mt-1 text-gray">
            <p>
              {t("Joining Date")}:{" "}
              {NumberFormat(moment(modalData?.createdAt).format("L"))}
            </p>
            <p className="my-1">
              {t("Contact")}: {NumberFormat(modalData?.phoneNumber)}
            </p>
            <p className="my-1">
              {t("Email")}: {modalData?.email}
            </p>
          </div>
        </div>
        {/* <div>
          <h1 className="text-20 font-500">Owner Information</h1>
          <div className="mt-1 text-gray">
            <p>Owner Name:Franklin</p>
            <p className="mt-1">Contact: +01254256426</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default GuestDetails;
