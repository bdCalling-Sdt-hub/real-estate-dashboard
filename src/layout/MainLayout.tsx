import { ConfigProvider, Layout } from "antd";

import { Content, Header } from "antd/es/layout/layout";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { paginationTheme } from "../themes/paginationThemes";
import { sidebardThemes } from "../themes/sidebarThemes";
import HeaderLayout from "./HeaderLayout";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const collapsed = useAppSelector((state) => state.layout.collapsed);
  const { lang } = useAppSelector((state) => state.lang);

  const navigate = useNavigate();
  const User = useAppSelector(useCurrentUser);
  useEffect(() => {
    // Get the navigation entries and cast them to the correct type
    const navigationEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];

    // Check if the page load was not from a reload
    const isReload = navigationEntries[0]?.type === "reload";

    // If it's not a reload and user data is available, navigate to the dashboard
    if (!isReload && User && User.role) {
      navigate(`/${User.role}/dashboard`);
    }
  }, [User, navigate]);

  return (
    <div>
      <ConfigProvider theme={sidebardThemes}>
        <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
          <Sidebar />
          <Layout>
            <Header className="sticky top-0 z-10 w-full bg-[#A9C9FF] ">
              <HeaderLayout />
            </Header>
            <ConfigProvider theme={paginationTheme}>
              <Content
                style={{
                  backgroundColor: "#FEF4E6",
                  ...(lang === "ar"
                    ? { paddingRight: collapsed ? "110px" : "215px" }
                    : { paddingLeft: collapsed ? "110px" : "215px" }),
                }}
                className={`responsive-content ${
                  !collapsed ? "collapsed" : ""
                }`}
              >
                <div
                  style={{
                    padding: 24,
                    height: "100%",
                    backgroundColor: "#FAFAFA",
                  }}
                >
                  <Outlet />
                </div>
              </Content>
            </ConfigProvider>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default MainLayout;
