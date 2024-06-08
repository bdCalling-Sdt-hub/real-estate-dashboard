import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import ResForm from "../Form/FormProvider";
import ResTextArea from "../Form/ResTextarea";

const RejectForm = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <ResForm onSubmit={onSubmit}>
      <ResTextArea name="reason" label="Plese enter rejection reason" />
      <div className="flex items-center gap-x-2">
        <Button
          htmlType="submit"
          className="bg-primary w-full flex justify-center items-center font-600 text-18 "
          icon={<CheckCircleOutlined />}
        >
          Submit
        </Button>
      </div>
    </ResForm>
  );
};

export default RejectForm;
