import { ConfigProvider, Layout } from "antd";

import { Content, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { paginationTheme } from "../themes/paginationThemes";
import { sidebardThemes } from "../themes/sidebarThemes";
import HeaderLayout from "./HeaderLayout";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const collapsed = useAppSelector((state) => state.layout.collapsed);
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <div>
      <ConfigProvider theme={sidebardThemes}>
        <Layout style={{ minHeight: "100vh", backgroundColor: "#edf5ea" }}>
          <Sidebar />
          <Layout>
            <Header className="sticky top-0 z-10 w-full bg-primary ">
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
                    backgroundColor: "#FEF4E6",
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
