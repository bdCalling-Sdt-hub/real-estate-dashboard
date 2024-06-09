import { Divider } from "antd";
import { useTranslation } from "react-i18next";
import { IoLocateOutline } from "react-icons/io5";
import img from "./../../../assets/person.jpg";
const HostDetails = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-30 font-500">{t("Host Information")}</h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <img src={img} alt="" width={200} />
        <div>
          <h1 className="text-20 font-500">John Smith</h1>
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
          <h1 className="text-20 font-500">{t("Personal Preferrence")}</h1>
          <div className="mt-1 text-gray">
            <p>{t("Joining Date")}: August 15, 2023</p>
            <p className="my-1">{t("Contact")}: +880187662665</p>
            <p className="my-1">{t("Email")}: nuropu@gmail.com</p>
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">{t("Bank Information")}</h1>
          <div className="mt-1 text-gray">
            <p>{t("Bank Name")}: Asia Bank</p>
            <p className="mt-1">{t("Beneficiarys Full Name")}: Nur Opu</p>
            <p className="mt-1">{t("IBAN/Account No")}: 1252****224541474</p>
            <p className="mt-1">
              {t("Beneficiarys Address")}: Dhaka,bangladesh
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDetails;
