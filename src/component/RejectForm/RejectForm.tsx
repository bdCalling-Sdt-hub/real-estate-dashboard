import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ResForm from "../Form/FormProvider";
import ResTextArea from "../Form/ResTextarea";
import { useRejectIdVerificationMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import ErrorResponse from "../UI/ErrorResponse";

const RejectForm = ({ id }: { id: string }) => {
  const [rejectFn] = useRejectIdVerificationMutation();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data)

    toast.loading("rejecting...", { id: "rejectId" });
    try {
      const res = await rejectFn({ id, body: data }).unwrap();
      console.log(res);
      toast.success(res?.message, { id: "rejectId" });
    } catch (error) {
      ErrorResponse(error, "rejectId");
    }
  };
  return (
    <ResForm onSubmit={onSubmit}>
      <ResTextArea name="reason" placeholder="write here" />
      <div className="flex items-center gap-x-2">
        <Button
          htmlType="submit"
          className="bg-primary w-full flex justify-center items-center font-600 text-18 "
          icon={<CheckCircleOutlined />}
        >
          {t("Submit")}
        </Button>
      </div>
    </ResForm>
  );
};

export default RejectForm;
