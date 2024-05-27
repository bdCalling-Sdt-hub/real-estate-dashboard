import { Divider } from "antd";
import { IoLocateOutline } from "react-icons/io5";
import img from "../../../assets/property2.jpg";
const PropertyDetails = () => {
  return (
    <div>
      <h1 className="text-30 font-500">Property Information</h1>
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
          <h1 className="text-20 font-500">Others Information</h1>
          <div className="mt-1 text-gray flex flex-col gap-y-1">
            <p>Category: Apartment</p>
            <p>Squre Feet: 100</p>
            <p>Bedrooms: 5</p>
            <p>Bathroom: 5</p>
            <p>Pricing: $500/month</p>
          </div>
        </div>
        <div>
          <h1 className="text-20 font-500">Owner Information</h1>
          <div className="mt-1 text-gray flex flex-col gap-y-1">
            <p>Owner Name:Franklin</p>
            <p>Owner Email:ownber@gmail.com</p>
            <p>Contact: +01254256426</p>
            <p>Verification Status: verifiyed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
