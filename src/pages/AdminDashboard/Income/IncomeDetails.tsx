/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
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
const IncomeDetails = ({ modalData }: { modalData: any }) => {
  console.log(modalData);
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-30 font-500">{t("Transaction Details")}</h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <img src={modalData?.user?.image} alt={modalData?.name} width={200} />
        <div>
          <h1 className="text-20 font-500">{modalData?.user?.name}</h1>
          <div className="flex gap-x-2 items-center">
            <p className="text-gray font-700 text-16">{t("Tenant")}:</p>
            {/* <p className="bg-[#64B5F6] flex gap-x-2 text-white px-4 rounded">
              <EyeOutlined />
              <span>view profile</span>
            </p> */}
          </div>
          {/* <div className="flex gap-x-2">
            <p className="text-gray font-700 text-16">Property ID:</p>
            <p className="bg-[#64B5F6] text-white px-4 rounded">{modalData?.pr}</p>
          </div> */}
        </div>
      </div>
      <Divider />

      {/* section 3 */}

      <div>
        <h1 className="text-20 font-500">{t("Others Information")}</h1>
        <div className="mt-1 text-gray">
          <DetailItem label="TRX ID" value={modalData?.transitionId} />
          <DetailItem label="Time & Date" value={modalData?.transitionDate} />
          <DetailItem label="Email" value={modalData?.user?.email} />
          <DetailItem label="Amount" value={modalData?.amount} />
        </div>
      </div>
    </div>
  );
};

export default IncomeDetails;
