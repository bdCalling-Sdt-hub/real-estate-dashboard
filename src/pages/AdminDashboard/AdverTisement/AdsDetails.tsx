import { Divider } from "antd";
import { IoLocateOutline } from "react-icons/io5";
import img from "./../../../assets/property.png";
const AdsDetails = () => {
  return (
    <div>
      <h1 className="text-30 font-500">Property information</h1>
      <Divider />
      {/* section 2 */}
      <div className="flex gap-x-4">
        <img src={img} alt="" />
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
          <h1 className="text-20 font-500">others Information</h1>
          <div className="mt-1 text-gray">
            <p>Start Date: August 15, 2023</p>
            <p>End Date: August 15, 2023</p>
            <p>Total Amount: $160</p>
            <p>Method: Bank</p>
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">Owner Information</h1>
          <div className="mt-1 text-gray">
            <p>Owner Name:Franklin</p>
            <p className="mt-1">Contact: +01254256426</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsDetails;
