/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuOutlined } from "@ant-design/icons";
import { Badge, Button, Select } from "antd";
import { KW, US } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";
import { IoIosNotifications } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { setCollapsed } from "../redux/features/layout/layoutSlice";
import { useGetMyNotificationQuery } from "../redux/features/notification/notificationApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { TUser, useCurrentUser } from "../redux/features/auth/authSlice";
import { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { setlang } from "../redux/features/locals/localSlice";

const HeaderLayout = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  const { lang } = useAppSelector((state) => state.lang);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    dispatch(setlang());
  };
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
          ...(lang === "ar"
            ? { marginRight: collapsed ? "100px" : "200px" }
            : { marginLeft: collapsed ? "100px" : "200px" }),
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
          {/* {pathname
            .split(/[/ -]/)
            .map((part) => part.toUpperCase())
            .join(" ")} */}
          {t("Dashboard")}
        </h1>
      </div>

      <div className="flex items-center  gap-x-6">
        <Select
          onChange={changeLanguage}
          defaultValue="ar"
          style={{ width: 120 }}
          options={[
            {
              value: "ar",
              label: (
                <div className="flex gap-x-2">
                  <KW title="Kuwait" className="w-[20px]" />
                  <p className="font-500">Arabic</p>
                </div>
              ),
            },
            {
              value: "en",
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
