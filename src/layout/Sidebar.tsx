/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Final Logo 2.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { IoLogInOutline } from "react-icons/io5";

import { useTranslation } from "react-i18next";
import { logout, useCurrentUser } from "../redux/features/auth/authSlice";
import { adminRoutes } from "../router/admin.route.";
import { sidebardThemes } from "../themes/sidebarThemes";
import { SidebarItemsGenerator } from "../utils/sidebarItemsGenerator";

const Sidebar = () => {
  const { lang } = useAppSelector((state) => state?.lang);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const collapsed = useAppSelector((state) => state.layout.collapsed);
  const { role }: any = useAppSelector(useCurrentUser) || "admin";
  console.log(role);
  // const role: any = "super_admin";
  const SidebarItems = SidebarItemsGenerator(adminRoutes, role);
  console.log(sidebardThemes);
  const handeLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      // collapsedWidth="0"
      style={{
        height: "100vh",
        zIndex: 154,
        overflow: "auto",
        position: "fixed",
        top: "0",
        backgroundColor: "#F5F5F5",
        ...(lang === "ar" ? { right: 0 } : { left: 0 }),
      }}
    >
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="" className="p-2" />
      </div>
      <Menu
        style={{
          backgroundColor: "#F5F5F5",
          marginTop: "10px",
        }}
        // theme="dark"
        mode="inline"
        // selectedKeys={[pathname]}
        // defaultSelectedKeys={[pathname]}
        // @ts-ignore
        items={SidebarItems}
      />

      {!collapsed ? (
        <div className=" absolute w-full bottom-5 flex justify-center items-center">
          <Button
            onClick={handeLogout}
            icon={<IoLogInOutline />}
            className="w-full bg-[#A9C9FF] flex items-center justify-center font-600 text-18 h-[40px]"
          >
            {t("Log Out")}
          </Button>
        </div>
      ) : null}
    </Sider>
  );
};

export default Sidebar;
