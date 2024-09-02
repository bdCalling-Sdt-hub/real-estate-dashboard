/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import unverified from "../../../assets/unverified.png";
import verified2 from "../../../assets/verified2.png";

import { NumberFormat } from "../../../utils/Format";
const DetailItem = ({
  label,
  value,
  labelStyle = "text-18 font-500",
  valueStyle = "",
}: any) => {
  const { t } = useTranslation();
  return (
    <p className="my-1">
      <span className={labelStyle}>{t(label)}:</span>{" "}
      <span className={valueStyle}>{value}</span>
    </p>
  );
};
const GuestDetails = ({ modalData }: { modalData: any }) => {
  console.log(modalData);
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
          <div className="flex items-center font-500 text-16 gap-x-2 text-black mt-2">
            {t("Booking Completed")}: 0
          </div>
          <div className="flex items-center font-500 text-16 gap-x-2 text-black mt-2">
            {t("Verification Status")}:{" "}
            {modalData?.isVerified ? (
              <img src={verified2} />
            ) : (
              <img src={unverified} />
            )}
          </div>
        </div>
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between">
        <div>
          <div className="mt-1 text-black font-500 text-16 flex flex-col gap-y-3">
            {/* <DetailItem label="Username" value={modalData?.userName} /> */}
            <DetailItem label="Full Name" value={modalData?.name} />
            <DetailItem label="Email" value={modalData?.email} />
            <DetailItem
              label="Contact"
              value={NumberFormat(modalData?.phoneNumber)}
              valueStyle="my-1"
            />
            <DetailItem label="Nationality" value={modalData?.nationality} />
            <DetailItem label="Gender" value={modalData?.gender} />
            <DetailItem
              label="Marital Status"
              value={modalData?.maritalStatus}
            />
            <DetailItem label="Date of Birth" value={modalData?.dateOfBirth} />
            <DetailItem label="Job Title" value={modalData?.job} />
            <DetailItem
              label="Income Bracket"
              value={modalData?.monthlyIncome}
            />
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
