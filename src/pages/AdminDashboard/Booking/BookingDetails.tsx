import { Divider } from "antd";
import { IoLocateOutline } from "react-icons/io5";
import img from "./../../../assets/property.png";
const BookingDetails = () => {
  return (
    <div>
      <h1 className="text-30 font-500">Booking Id: #9874</h1>
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
          <h1 className="text-20 font-500">Booking Information</h1>
          <div className="mt-1 text-gray">
            <p>Booking Date: August 15, 2023 - August 18, 2023</p>
            <p className="my-1">User Name: Jhon Doy</p>
            <p>Total Amount: $160</p>
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

export default BookingDetails;
