import { Button, message, Steps, theme } from "antd";
import React, { useState } from "react";
import PropertyBasicInformation from "../../../component/AddPropertySteps/PropertyBasicInformation";

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
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={current} items={items} />
      <div
        style={{
          marginTop: 16,
          padding: 24,
          background: token.colorBgContainer,
          borderRadius: 8,
        }}
      >
        {steps[current].content}
      </div>
      <div>
        {current < steps.length - 1 && (
          <Button onClick={() => next()}>Next</Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default CreateProperty;
