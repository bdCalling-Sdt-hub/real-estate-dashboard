import { ThemeConfig } from "antd";
export const sidebardThemes: ThemeConfig = {
  components: {
    Menu: {
      itemSelectedBg: "#A9C9FF",
      itemSelectedColor: "black",
      itemColor: "black",
      borderRadiusLG: 0,
      itemMarginInline: 0,
    },
    Pagination: {
      colorPrimary: "white",
      colorText: "white",
      colorPrimaryBorder: "#A9C9FF",
      colorPrimaryHover: "#A9C9FF",
      itemActiveBg: "#A9C9FF",
      itemActiveBgDisabled: "rgba(255, 255, 255, 0.15)",
    },
    // Table: {
    //   headerBorderRadius: 0,
    //   headerBg: "#0B835C",
    //   headerColor: "white",
    // },
  },
  token: {
    colorPrimary: "#0052B4",
    colorInfo: "#0B835C",
    colorLink: "#0B835C",
    colorSuccess: "#0B835C",
  },
};
