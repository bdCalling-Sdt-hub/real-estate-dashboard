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
          <p>Total Properties: {modalData?.totalProperties ?? 0}</p>
          <p className="flex items-center gap-x-2 text-16 font-500">
            Verification Status:
            <span>
              {modalData?.isVerified ? (
                <img src={verified2} />
              ) : (
                <img src={unverified} />
              )}
            </span>
          </p>
        </div>
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-20 font-500">{t("Personal Details")}</h1>
          <div className="mt-1 text-gray">
            <DetailItem label="Username" value={modalData?.username} />
            <DetailItem label="Full Name" value={modalData?.name} />
            <DetailItem
              label="Phone No."
              value={
                modalData?.phoneNumber
                  ? NumberFormat(modalData?.phoneNumber)
                  : modalData?.phoneNumber
              }
            />
            <DetailItem label="Email" value={modalData?.email} />
            <DetailItem label="Nationality" value={modalData?.nationality} />
            <DetailItem label="Gender" value={modalData?.gender} />
            <DetailItem label="Date of Birth" value={modalData?.dateOfBirth} />
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">{t("Bank Details")}</h1>
          <div className="mt-1 text-gray">
            <DetailItem label="Country" value={modalData?.bankInfo?.country} />
            <DetailItem
              label="Beneficiary's Full Name"
              value={modalData?.bankInfo?.accountHolder}
            />
            <DetailItem
              label="IBAN/Account No"
              value={modalData?.bankInfo?.accountNumber}
            />
            <DetailItem
              label="Beneficiary's Address"
              value={modalData?.bankInfo?.bankAddress}
            />

            <DetailItem
              label="Swift Code"
              value={modalData?.bankInfo?.swiftCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDetails;
