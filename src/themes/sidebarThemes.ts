import { ThemeConfig } from "antd";
export const sidebardThemes: ThemeConfig = {
  components: {
    Menu: {
      itemSelectedBg: "#F39200",
      itemSelectedColor: "white",
      itemColor: "black",
      borderRadiusLG: 0,
      itemMarginInline: 0,
    },
    Pagination: {
      colorPrimary: "#edf5ea",
      colorText: "black",
      colorPrimaryBorder: "#F39200",
      colorPrimaryHover: "#F39200",
      itemActiveBg: "#F39200",
      itemActiveBgDisabled: "rgba(255, 255, 255, 0.15)",
    },
    // Table: {
    //   headerBorderRadius: 0,
    //   headerBg: "#0B835C",
    //   headerColor: "white",
    // },
  },
  token: {
    colorPrimary: "#F39200",
    colorInfo: "#0B835C",
    colorLink: "#0B835C",
    colorSuccess: "#0B835C",
  },
};
