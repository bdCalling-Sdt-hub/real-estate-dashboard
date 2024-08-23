import { Button, message, Steps, theme } from "antd";
import React from "react";
import PropertyBasicInformation from "../../../component/AddPropertySteps/PropertyBasicInformation";
import { setCount } from "../../../redux/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const steps = [
  {
    title: "Basic information",
    content: <PropertyBasicInformation />,
  },
  {
    title: "Images and videos",
    content: <h1>Second-content</h1>,
  },
  {
    title: "Address and documents",
    content: <h1>Last-content</h1>,
  },
];

const CreateProperty: React.FC = () => {
  const { token } = theme.useToken();
  const { count } = useAppSelector((state) => state.property);
  const dispatch = useAppDispatch();
  const next = () => {
    dispatch(setCount(Number(count) + 1));
  };

  const prev = () => {
    dispatch(setCount(Number(count) - 1));
  };

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
      <div className="flex justify-end">
        {count === steps.length - 1 && (
          <div>
            <Button
              className="bg-primary text-white text-20 font-500 w-[100px] h-[44px]"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          </div>
        )}
        {count > 0 && (
          <Button
            className="bg-primary text-white text-20 font-500 w-[150px] h-[44px]"
            style={{ margin: "0 8px" }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default CreateProperty;
