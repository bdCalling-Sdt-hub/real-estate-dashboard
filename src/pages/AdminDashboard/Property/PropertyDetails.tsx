import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { IoLocateOutline } from "react-icons/io5";
import { NumberFormat, priceFormat } from "../../../utils/Format";
import { CgLayoutGrid } from "react-icons/cg";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          <h1 className="text-20 font-500">{modalData?.propertyName}</h1>
          <div className="flex items-start gap-x-2 text-gray mt-2">
            <IoLocateOutline className="mt-1" />
            <p className="w-[60%]">{`Apartment : ${
              modalData?.address?.apartment || ""
            }, Floor : ${modalData?.address?.floor || ""}, House : ${
              modalData?.address?.house || ""
            }, Area: ${modalData?.address?.area || ""}, State : ${
              modalData?.address?.state || ""
            }, street : ${modalData?.address?.street || ""}`}</p>
          </div>
        </div>
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-20 font-500">{t("Others Information")}</h1>
          <div className="mt-1 text-gray flex flex-col gap-y-1">
            <p>
              {t("Category")}:{" "}
              <span className="text-primary">
                {t(modalData?.category?.name)}
              </span>
            </p>
            {/* <p>Squre Feet: 100</p> */}
            <p>
              {t("Bedroom")}:{" "}
              <span className="text-primary">
                {modalData?.bedrooms ? NumberFormat(modalData?.bedrooms) : " "}
              </span>
            </p>
            <p>
              {t("Bathroom")}:{" "}
              <span className="text-primary">
                {modalData?.bathrooms
                  ? NumberFormat(modalData?.bathrooms)
                  : " "}
              </span>
            </p>
            <p>
              {t("Pricing")}:{" "}
              <span className="font-700 text-primary">
                {priceFormat(parseInt(modalData?.perNightPrice))} / {t("night")}
              </span>
            </p>
            <p>
              {t("Pricing")}:{" "}
              <span className="font-700 text-primary">
                {priceFormat(parseInt(modalData?.perMonthPrice))} / {t("month")}
              </span>
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">{t("Landlords Information")}</h1>
          <div className="mt-1 text-gray flex flex-col gap-y-1">
            <p>
              {t("Name")}:{" "}
              <span className="text-primary">{modalData?.host?.name}</span>
            </p>
            <p>
              {t("Email")}:{" "}
              <span className="text-primary">{modalData?.host?.email}</span>
            </p>
            <p>
              {t("Contact")}:{" "}
              {
                <span className="text-primary">
                  {modalData?.host?.phoneNumber &&
                    NumberFormat(modalData?.host?.phoneNumber)}
                </span>
              }
            </p>
            <p>
              {t("Verification Status")}:{" "}
              <span
                className={`px-2 py-1 rounded-md ${
                  modalData?.host?.verificationRequest ==="accepted"
                    ? "bg-[#bbf7d0] text-[#15803d]"
                    : "bg-[#fecaca] text-[#b91c1c]"
                }`}
              >
                {modalData?.host?.verificationRequest ==="accepted"
                  ? t("verified")
                  : t("unverified")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
