import { Button, message, Steps, theme } from "antd";
import React from "react";
import PropertyBasicInformation from "../../../component/AddPropertySteps/PropertyBasicInformation";
import { setCount } from "../../../redux/features/property/propertySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

const steps = [
  {
    title: "First",
    content: <PropertyBasicInformation />,
  },
  {
    title: "Second",
    content: <h1>Second-content</h1>,
  },
  {
    title: "Last",
    content: <h1>Last-content</h1>,
  },
];

const CreateProperty: React.FC = () => {
  const { token } = theme.useToken();
  const { count } = useAppSelector((state) => state.property.count);
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
        {steps[count].content}
      </div>
      <div>
        {count < steps.length - 1 && (
          <Button onClick={() => next()}>Next</Button>
        )}
        {count === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {count > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default CreateProperty;
