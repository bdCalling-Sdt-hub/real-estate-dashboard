/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuOutlined } from "@ant-design/icons";
import { Badge, Button, Select } from "antd";
import { KW, US } from "country-flag-icons/react/3x2";
import { IoIosNotifications } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { setCollapsed } from "../redux/features/layout/layoutSlice";
import { useGetMyNotificationQuery } from "../redux/features/notification/notificationApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { TUser, useCurrentUser } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const HeaderLayout = () => {
  const dispatch = useAppDispatch();
  const { data: notficationData } = useGetMyNotificationQuery({ read: false });
  // const { data: pData } = useProfileQuery(undefined);
  // const User: TUser | null = useAppSelector(useCurrentUser);
  const User = {
    role: "super_admin",
  };
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
        <Select
          defaultValue="arabic"
          style={{ width: 120 }}
          options={[
            {
              value: "arabic",
              label: (
                <div className="flex gap-x-2">
                  <KW title="Kuwait" className="w-[20px]" />
                  <p className="font-500">Arabic</p>
                </div>
              ),
            },
            {
              value: "english",
              label: (
                <div className="flex gap-x-2">
                  <US title="United States" className="w-[20px]" />
                  <p className="font-500">English</p>
                </div>
              ),
            },
          ]}
        />
        <Badge count={notficationData?.meta?.total}>
          <NavLink to={`/${User?.role}/notification`}>
            <IoIosNotifications className="text-white  text-32 cursor-pointer" />{" "}
          </NavLink>
        </Badge>

        <NavLink to={`/${User?.role}/profile`}>
          <FaRegCircleUser color="white" size={25} />
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderLayout;
