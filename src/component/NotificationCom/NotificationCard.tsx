import { Col } from "antd";
import moment from "moment";
import notificationLogo from "../../assets/notificationLogo.png";
/* eslint-disable @typescript-eslint/no-explicit-any */
const NotificationCard = ({ data }: any) => {
  const backgroundColor = !data.read ? "#E5E7EB" : "##EDF5EA";
  return (
    <Col span={24}>
      <div
        className="flex gap-x-2  text-black pb-2  p-2 rounded "
        style={{ backgroundColor }}
      >
        <img src={notificationLogo} alt="" className="h-[40px] my-auto" />

        <div>
          <h1 className="text-20 pb-2">{data?.message}</h1>
          <p>{data?.description}</p>
          <p>{moment(data?.createdAt).format("YYYY-MM-DD hh:mm a")}</p>
        </div>
      </div>
      <hr className="text-[#E5E7EB] " />
    </Col>
  );
};

export default NotificationCard;
