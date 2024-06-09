import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { IoLocateOutline } from "react-icons/io5";
import img from "../../../assets/property2.jpg";
const PropertyDetails = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-30 font-500">{t("Property Information")}</h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <img src={img} alt="" width={200} height={250} />
        <div>
          <h1 className="text-20 font-500">Hotel BlueSky</h1>
          <div className="flex items-center gap-x-2 text-gray mt-2">
            <IoLocateOutline />
            <p>New York,USA</p>
          </div>
        </div>
      </div>
      <Divider />

      {/* section 3 */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-20 font-500">{t("Others Information")}</h1>
          <div className="mt-1 text-gray flex flex-col gap-y-1">
            <p>{t("Category")}: Apartment</p>
            {/* <p>Squre Feet: 100</p> */}
            <p>{t("Bedroom")}: 5</p>
            <p>{t("Bathroom")}: 5</p>
            <p>{t("Pricing")}: $500/month</p>
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">{t("Host Information")}</h1>
          <div className="mt-1 text-gray flex flex-col gap-y-1">
            <p>{t("Name")}:Franklin</p>
            <p>{t("Email")}:ownber@gmail.com</p>
            <p>{t("Contact")}: +01254256426</p>
            <p>{t("Verification Status")}: verifiyed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
