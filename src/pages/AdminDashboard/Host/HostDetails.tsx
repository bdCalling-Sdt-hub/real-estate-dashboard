import { Divider } from "antd";
import { IoLocateOutline } from "react-icons/io5";
import img from "./../../../assets/person.jpg";
const HostDetails = () => {
  return (
    <div>
      <h1 className="text-30 font-500">Host Information</h1>
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
          <h1 className="text-20 font-500">Personal Preferrence</h1>
          <div className="mt-1 text-gray">
            <p>Joining Date: August 15, 2023</p>
            <p className="my-1">Contact: +880187662665</p>
            <p className="my-1">Email: nuropu@gmail.com</p>
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">Bank Information</h1>
          <div className="mt-1 text-gray">
            <p>Bank Name: Asia Bank</p>
            <p className="mt-1">Beneficiarys Full Name: Nur Opu</p>
            <p className="mt-1">IBAN/Account No: 1252****224541474</p>
            <p className="mt-1">Beneficiarys Address: Dhaka,bangladesh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostDetails;
