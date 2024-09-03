import { Steps as Antsteps, theme } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import ImagesAndVideos from "../../../component/AddPropertySteps/ImagesAndVideos";
import PropertyBasicInformation from "../../../component/AddPropertySteps/PropertyBasicInformation";
import { useAppSelector } from "../../../redux/hooks";

const Steps = () => {
  const { t } = useTranslation();
  return [
    {
      title: t("Basic information"),
      content: <PropertyBasicInformation />,
    },
    {
      title: t("Address and documents"),
      content: <ImagesAndVideos />,
    },
  ];
};

const CreateProperty: React.FC = () => {
  const { token } = theme.useToken();
  const { count } = useAppSelector((state) => state.property);
  const items = Steps().map((item) => ({ key: item.title, title: item.title }));
  return (
    <>
      <Antsteps current={count} items={items} />
      <div
        style={{
          marginTop: 16,
          padding: 24,
          background: token.colorBgContainer,
          borderRadius: 8,
        }}
      >
        {Steps()[count]?.content}
      </div>
    </>
  );
};

export default CreateProperty;
