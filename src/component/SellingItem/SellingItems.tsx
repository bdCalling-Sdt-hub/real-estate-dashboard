/* eslint-disable @typescript-eslint/no-explicit-any */

import { Divider } from "antd";
import foodImage from "../../assets/food.png";
const SellingItems = ({ data }: any) => {
  console.log(data);
  return (
    <div className=" ">
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <img src={foodImage} alt="" width={80} className="rounded-lg" />
          <div>
            <h1>{data?.food}</h1>
            <p className="text-deepGray">totalSales:{data.totalSales}</p>
          </div>
        </div>
        <h1 className="text-24 font-600">${data?.price}</h1>
      </div>
      <Divider className="bg-deepGray h-[2px]" />
    </div>
  );
};

export default SellingItems;
