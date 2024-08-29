import { Divider } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { IoLocateOutline } from "react-icons/io5";
import { NumberFormat, priceFormat } from "../../../utils/Format";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BookingDetails = ({ modalData }: { modalData: any }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-30 font-500">
        {t("Booking Id")}: #{modalData?._id?.slice(modalData?._id?.length - 8)}
      </h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <img
          src={modalData?.residence?.images[0]?.url}
          alt={modalData?.residence?.propertyName}
        />
        <div>
          <h1 className="text-20 font-500">
            {modalData?.residence?.propertyName}
          </h1>
          <div className="flex items-center gap-x-2 text-gray mt-2">
            <IoLocateOutline />
            <p>
              {modalData?.residence?.address?.area +
                ", " +
                modalData?.residence?.address?.state}
            </p>
          </div>
        </div>
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-20 font-500">{t("Booking Information")}</h1>
          <div className="mt-1 text-gray">
            <p>
              {t("Date")}:{" "}
              {moment(modalData?.startDate).format("L") +
                " - " +
                moment(modalData?.endDate).format("L")}
            </p>
            <p className="my-1">
              {t("Name")}: {modalData?.user?.name}
            </p>
            <p>
              {t("Total Amount")}:{" "}
              {modalData?.totalPrice
                ? priceFormat(modalData?.totalPrice)
                : modalData?.totalPrice}
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">{t("Landlords Information")}</h1>
          <div className="mt-1 text-gray">
            <p>
              {t("Name")}: {modalData?.author?.name}
            </p>
            <p className="mt-1">
              {t("Contact")}:{" "}
              {modalData?.residence?.host?.phoneNumber
                ? NumberFormat(modalData?.residence?.host?.phoneNumber)
                : modalData?.residence?.host?.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
