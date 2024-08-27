import { Steps, theme } from "antd";
import React from "react";
import ImagesAndVideos from "../../../component/AddPropertySteps/ImagesAndVideos";
import PropertyBasicInformation from "../../../component/AddPropertySteps/PropertyBasicInformation";
import { useAppSelector } from "../../../redux/hooks";

const steps = [
  {
    title: "Basic information",
    content: <PropertyBasicInformation />,
  },
  {
    title: "Address and documents",
    content: <ImagesAndVideos />,
  },
];

const CreateProperty: React.FC = () => {
  const { token } = theme.useToken();
  const { count } = useAppSelector((state) => state.property);
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <>
      <Steps current={count} items={items} />
      <div
        style={{
          marginTop: 16,
          padding: 24,
          background: token.colorBgContainer,
          borderRadius: 8,
        }}
      >
        {steps[count]?.content}
      </div>
    </>
  );
};

export default CreateProperty;
