/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuOutlined } from "@ant-design/icons";
import { IoIosNotifications } from "react-icons/io";

import { Badge, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { setCollapsed } from "../redux/features/layout/layoutSlice";
import { useGetMyNotificationQuery } from "../redux/features/notification/notificationApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { TUser, useCurrentUser } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { useProfileQuery } from "../redux/features/auth/authApi";
import { TUser, useCurrentUser } from "../redux/features/auth/authSlice";
import showImage from "../utils/showImage";

const HeaderLayout = () => {
  const dispatch = useAppDispatch();
  const { data: notficationData } = useGetMyNotificationQuery({ read: false });
  const { data: pData } = useProfileQuery(undefined);
  const User: TUser | null = useAppSelector(useCurrentUser);
  const notification: any = useAppSelector(
    (state) => state.notification.notification
  );
  useEffect(() => {
    toast.info(notification?.message);
  }, [notification]);
  const { pathname } = useLocation();
  const collapsed = useAppSelector((state) => state.layout.collapsed);
  return (
    <div className="flex justify-between">
      <div
        className="flex items-center"
        style={{
          marginLeft: collapsed ? "100px" : "200px",
        }}
      >
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: "white" }} />}
          onClick={() => dispatch(setCollapsed())}
          style={{
            fontSize: "16px",
            width: 45,
            height: 45,
            marginRight: "10px",
          }}
        />
        <h1 className="text-white text-20">
          {pathname
            .split(/[/ -]/)
            .map((part) => part.toUpperCase())
            .join(" ")}
        </h1>
      </div>
      <div className="flex items-center  gap-x-6">
        <Badge count={notficationData?.meta?.total}>
          <NavLink to={`/${User?.role}/notification`}>
            <IoIosNotifications className="text-white  text-32 cursor-pointer" />{" "}
          </NavLink>
        </Badge>

        <NavLink to={`/${User?.role}/profile`}>
          <img
            src={showImage(pData?.data?.image)}
            width={40}
            className=" object-cover rounded-full"
            alt=""
          />
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderLayout;
