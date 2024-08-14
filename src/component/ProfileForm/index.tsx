/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "antd";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MdEditSquare } from "react-icons/md";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../../redux/features/auth/authApi";
import ResForm from "../Form/FormProvider";
import ResInput from "../Form/ResInput";
import ErrorResponse from "../UI/ErrorResponse";

const ProfileForm = ({ ProfileData, imageFile, toggleEdit, refetch }: any) => {
  const { t } = useTranslation();
  const [updateProfile] = useUpdateProfileMutation();

  const defaultValues = {
    name: ProfileData?.data?.name,
    phoneNumber: ProfileData?.data?.phoneNumber,
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating profile...");
    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("data", JSON.stringify(data));
      const res = await updateProfile(formData).unwrap();
      refetch();
      toast.success(res?.message, {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };

  return (
    // @ts-ignore

    <ResForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      disabled={toggleEdit}
    >
      <ResInput
        labelColor="#FD8533"
        label={t("Name")}
        type="text"
        name="name"
        placeholder="your name"
        size="large"
      />
      <ResInput
        labelColor="#FD8533"
        label={t("Phone Number")}
        type="number"
        name="phoneNumber"
        placeholder="your phone number"
        size="large"
      />

      <div className="flex items-center gap-x-2">
        <Button
          htmlType="submit"
          className="bg-primary w-full flex justify-center items-center font-600 text-18 "
          icon={<MdEditSquare />}
        >
          {t("Submit")}
        </Button>
      </div>
    </ResForm>
  );
};

export default ProfileForm;
