/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import unverified from "../../../assets/unverified.png";
import verified2 from "../../../assets/verified2.png";
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
          <div className="flex items-center font-500 text-16 gap-x-2 text-black mt-2">
            Booking Completed: 10
          </div>
          <div className="flex items-center font-500 text-16 gap-x-2 text-black mt-2">
            Verification Status:{" "}
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
            <p>
              {t("Username")}: {modalData?.username}
            </p>
            <p>
              {t("Full name")}: {modalData?.name}
            </p>
            <p>
              {t("Email")}: {modalData?.email}
            </p>
            <p className="my-1">
              {t("Contact")}: {NumberFormat(modalData?.phoneNumber)}
            </p>
            <p>
              {t("Nationality")}: {modalData?.nationality}
            </p>
            <p>
              {t("Gender")}: {modalData?.gender}
            </p>
            <p>
              {t("Marital Status")}: {modalData?.maritalStatus}
            </p>
            <p>
              {t("Date of Birth")}: {modalData?.dateofBirth}
            </p>
            <p>
              {t("Job Title")}: {modalData?.job}
            </p>
            <p>
              {t("Income Bracket")}: {modalData?.monthlyIncome}
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
