/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { IoLocateOutline } from "react-icons/io5";
import { NumberFormat, priceFormat } from "../../../utils/Format";
import img from "./../../../assets/property.png";

const AdsDetails = ({ modalData }: { modalData: any }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-30 font-500">{t("Property Information")}</h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <img src={img} alt="" />
        <div>
          <h1 className="text-20 font-500">
            {modalData?.property?.propertyName}
          </h1>
          <div className="flex items-center gap-x-2 text-gray mt-2">
            <IoLocateOutline />
            <p>
              {`area: ${modalData?.property?.address?.area}, \n 
              apartment: ${modalData?.property?.address?.apartment}, \n  
              block: ${modalData?.property?.address?.block} \n 
              floor: ${modalData?.property?.address?.floor} \n 
              house: ${modalData?.property?.address?.house} \n 
              state: ${modalData?.property?.address?.state} \n 
              street: ${modalData?.property?.address?.street}
`}
            </p>
          </div>
        </div>
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-20 font-500">{t("Others Information")}</h1>
          <div className="mt-1 text-gray">
            <p>
              {t("Start Date")}: {moment(modalData?.startAt).format("LL")}
            </p>
            <p>
              {t("End Date")}: {moment(modalData?.expireAt).format("LL")}
            </p>
            <p>
              {t("Total Amount")}: {priceFormat(modalData?.price)}
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">{t("Landlords Information")}</h1>
          <div className="mt-1 text-gray">
            <p>
              {t("Name")}: {modalData?.property?.host?.name}
            </p>
            <p className="mt-1">
              {t("Contact")}:{" "}
              {NumberFormat(modalData?.property?.host?.phoneNumber)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsDetails;
