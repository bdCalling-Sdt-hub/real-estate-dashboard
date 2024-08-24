/* eslint-disable @typescript-eslint/no-explicit-any */
import { StarFilled } from "@ant-design/icons";
import { Divider } from "antd";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailItem = ({
  label,
  value,
  labelStyle = "text-16 font-500",
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
const PropertyDetails = ({ modalData }: { modalData: any }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-30 font-500">{t("Property Information")}</h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <img
          src={modalData?.images?.length !== 0 && modalData?.images[0]?.url}
          alt={modalData?.propertyName || "property image"}
          width={200}
          height={250}
        />
        <div>
          <h1 className="text-20 font-500">
            Property ID: #{modalData?._id.slice(0, 6)}
          </h1>
          <h1 className="text-20 font-500">
            Total Booking: {modalData?.totalBooking ?? 0}
          </h1>
          <div className="flex items-center gap-x-2 text-gray mt-2">
            <h5 className="font-500 text-black"> Reviews:</h5>
            <span>
              <StarFilled className="text-[#fbb606] text-18" />
            </span>
            <p>{modalData?.averageRating}</p>
            <p>({modalData?.totalReviews ?? 0})</p>
          </div>
          <div className="flex items-center gap-x-2 text-16 text-gray mt-2">
            <h5 className="font-500 text-black">Owner:</h5>
            <p className="bg-[#A3D9A5] p-[2px] rounded-sm">
              {modalData?.host?.name}
            </p>
          </div>
        </div>
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-20 font-500">{t("Property Address")}</h1>
          <div className="mt-1 text-gray flex flex-col gap-y-1">
            <DetailItem
              label="Property Type"
              value={modalData?.category?.name}
            />
            <DetailItem
              label="Property Title"
              value={modalData?.propertyName}
            />
            <DetailItem
              label="Property Size (Sqm)"
              value={modalData?.squareFeet}
            />
            <DetailItem label="Bedrooms" value={modalData?.bedrooms} />
            <DetailItem label="Bathrooms" value={modalData?.bathrooms} />
            <DetailItem label="Rental Type" value={modalData?.rentType} />
            <DetailItem label="Rent" value={`${modalData?.rent} KWD/Monthly`} />
            <DetailItem
              label="Residence Type"
              value={modalData?.residenceType}
            />
            {/* <p>Squre Feet: 100</p> */}

            {/* <p>
              {t("Pricing")}:{" "}
              <span className="font-700 text-primary">
                {priceFormat(parseInt(modalData?.perMonthPrice))} / {t("month")}
              </span>
            </p> */}
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">{t("Property Address")}</h1>
          <DetailItem
            label="Governorate"
            value={modalData?.address?.governorate}
          />
          <DetailItem label="Area" value={modalData?.address?.area} />
          <DetailItem label="Block" value={modalData?.address?.block} />
          <DetailItem label="Street" value={modalData?.address?.street} />
          <DetailItem
            label="House/Building"
            value={modalData?.address?.avenue}
          />
          <DetailItem label="Floor" value={modalData?.address?.floor} />
          <DetailItem label="Apartment" value={modalData?.address?.apartment} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
