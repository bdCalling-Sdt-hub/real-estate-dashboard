/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import FileUpload from "../../../component/FileUpload";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";
import ResSelect from "../../../component/Form/ResSelect";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import UseImageUpload from "../../../hooks/useImageUpload";
import { useAddLandlordMutation } from "../../../redux/features/auth/authApi";
import { landlordSchema } from "../../../schema/host.schema";
const CreateHost = ({ setshow }: any) => {
  const { imageUrl, imageFile, setFile } = UseImageUpload();
  const { t } = useTranslation();
  const [createLandlord] = useAddLandlordMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formatedData = {
      ...data,
      role: "landlord",
      code: "+965",
    };
    const toastId = toast.loading("creating.....");
    const formData = new FormData();
    try {
      formData.append("image", imageFile!);
      formData.append("data", JSON.stringify(formatedData));
      await createLandlord(formData).unwrap();
      toast.success("Landlord added successfully.", {
        id: toastId,
        duration: 2000,
      });
      setshow((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  return (
    <div className="">
      <div>
        <div className="text-center">
          <FileUpload setSelectedFile={setFile} imageUrl={imageUrl} />
        </div>
        <ResForm
          onSubmit={onSubmit}
          resolver={zodResolver(landlordSchema.createLandlord)}
        >
          <ResInput
            size="large"
            type="text"
            name="username"
            placeholder={t("Enter user name")}
            label={t("Enter user name")}
          />
          <ResInput
            size="large"
            type="text"
            name="name"
            placeholder={t("Enter full name")}
            label={t("Enter full name")}
          />
          <ResInput
            size="large"
            type="email"
            name="email"
            placeholder={t("Enter email")}
            label={t("Enter email")}
          />
          <ResInput
            size="large"
            type="number"
            name="phoneNumber"
            placeholder={t("Enter phone number")}
            label={t("Enter phone number")}
          />
          <ResSelect
            size="large"
            options={[
              { label: t("Male"), value: "Male" },
              { label: t("Female"), value: "Female" },
            ]}
            name="gender"
            placeholder={t("Select gender")}
            label={t("Select gender")}
          />
          <ResSelect
            size="large"
            options={[
              { label: t("Under 800 KD"), value: "Under 800 KD" },
              {
                label: t("Between 800 - 1499 KD"),
                value: "Between 800 - 1499 KD",
              },
              {
                label: t("Between 1500 - 3000 KD"),
                value: "Between 1500 - 3000 KD",
              },
              { label: t("Over 3000 KD"), value: "Over 3000 KD" },
            ]}
            name="monthlyIncome"
            placeholder={t("Select monthly income")}
            label={t("Select monthly income")}
          />
          <ResInput
            size="large"
            type="text"
            name="password"
            placeholder={t("Enter password")}
            label={t("Enter password")}
          />
          <Button
            htmlType="submit"
            className="w-full bg-primary text-white font-medium h-[40px]"
          >
            {t("Submit")}
          </Button>
        </ResForm>
      </div>
    </div>
  );
};

export default CreateHost;
