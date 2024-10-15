/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, Image } from "antd";
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
  const { t } = useTranslation();

  console.log(modalData);
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
      <div className=""> 
          <div className="mt-1 text-black font-500 text-16 grid grid-cols-2">
            {/* <DetailItem label="Username" value={modalData?.userName} /> */}
            {/* <div className="grid grid-cols-2 w-full"> */}
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

    {modalData?.documents?.selfie &&
    <>
    <h1 className="text-32 font-semibold my-4">{t("Selfie")}</h1>
    
    <Image
        className="object-cover"
        height={200}
        src={modalData?.documents?.selfie}
        alt="civilId frontSide"
      />
      </>}

     {modalData?.documents?.documents?.length > 0 && <> <h1 className="text-32 font-semibold my-4">{t("Documents")}</h1>
      <div className="flex gap-x-4">
        {
          modalData?.documents?.documents?.map((doc: any) => (
            <Image
              className="object-cover"
              height={200}
              src={doc?.url}
              alt="Documents"
            />
          ))}
      </div></>}
      </div> 
  );
};

export default GuestDetails;
