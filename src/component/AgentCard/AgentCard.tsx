/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "antd";
import { priceFormat } from "../../utils/Format";
const AgentCard = ({ data }: any) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2">
          <img
            src={data?.author?.image}
            alt={data?.author?.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h1 className="text-20 font-500 mb-1">{data?.author?.name}</h1>
          </div>
        </div>
        <h1 className="text-20 font-500 text-gray">
          {data?.totalTransactions}
        </h1>
        <h1>{priceFormat(data?.totalIncome)}</h1>
      </div>
      <Divider className="my-1" />
    </>
  );
};

export default AgentCard;
