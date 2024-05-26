/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import person from "../../assets/person.jpg";
const AgentCard = ({ data }: any) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <img
            src={person}
            alt=""
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="text-20 font-500 mb-1">{data?.name}</h1>
            <h5 className="text-gray ">{data?.address}</h5>
          </div>
        </div>
        <h1 className="text-20 font-500 text-gray">{data?.properties}</h1>
        <h1>{data?.income}</h1>
      </div>
      <Divider className="my-1" />
    </>
  );
};

export default AgentCard;
