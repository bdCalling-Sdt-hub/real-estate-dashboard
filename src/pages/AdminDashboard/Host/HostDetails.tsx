/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { IoLocateOutline } from "react-icons/io5";
import moment from "moment";
import { NumberFormat } from "../../../utils/Format";
const HostDetails = ({ modalData }: { modalData: any }) => {
  const { t } = useTranslation(); 
  return (
    <div>
      <h1 className="text-30 font-500">{t("Landlords Information")}</h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <img src={modalData?.image} alt={modalData?.name} width={200} />
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
              {t("Joining Date")}: {moment(modalData?.createdAt).format("L")}
            </p>
            <p className="my-1">
              {t("Contact")}:{" "}
              {modalData?.phoneNumber
                ? NumberFormat(modalData?.phoneNumber)
                : modalData?.phoneNumber}
            </p>
            <p className="my-1">
              {t("Email")}: {modalData?.email}
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">{t("Bank Information")}</h1>
          <div className="mt-1 text-gray">
            <p>
              {t("Bank Name")}: {modalData?.bankInfo?.bankName}
            </p>
            <p className="mt-1">
              {t("Beneficiarys Full Name")}:{" "}
              {modalData?.bankInfo?.accountHolder}
            </p>
            <p className="mt-1">
              {t("IBAN/Account No")}: {modalData?.bankInfo?.accountNumber}
            </p>
            <p className="mt-1">
              {t("Beneficiarys Address")}: {modalData?.bankInfo?.bankAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDetails;
