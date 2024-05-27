/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "antd";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { MdEditSquare } from "react-icons/md";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../../redux/features/auth/authApi";
import ResForm from "../Form/FormProvider";
import ResInput from "../Form/ResInput";
import ErrorResponse from "../UI/ErrorResponse";

interface ProfilePros {
  usrName: string;
  name: string;
  email: string;
}
const ProfileForm = ({ ProfileData, imageFile, toggleEdit }: any) => {
  const [updateProfile] = useUpdateProfileMutation();
  const defaultValues = {
    name: ProfileData?.data?.name,
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating profile...");

    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("file", imageFile);
      }
      formData.append("data", JSON.stringify(data));
      const res = await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully", {
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
        label="Name"
        type="text"
        name="name"
        placeholder="your name"
        size="large"
      />
      <ResInput
        labelColor="#FD8533"
        label="Phone Number"
        type="number"
        name="name"
        placeholder="your name"
        size="large"
      />

      <div className="flex items-center gap-x-2">
        <Button
          htmlType="submit"
          className="bg-primary w-full flex justify-center items-center font-600 text-18 "
          icon={<MdEditSquare />}
        >
          Submit
        </Button>
      </div>
    </ResForm>
  );
};

export default ProfileForm;
