import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import FileUpload from "../../../component/FileUpload";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";
import ResSelect from "../../../component/Form/ResSelect";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import UseImageUpload from "../../../hooks/useImageUpload";
import { useAddLandlordMutation } from "../../../redux/features/auth/authApi";
import { landlordSchema } from "../../../schema/host.schema";
const CreateHost = () => {
  const { imageUrl, imageFile, setFile } = UseImageUpload();
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
      toast.success("Landlord added successfully.");
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center p-10">
      <div className="flex-1 text-center">
        <h1 className="text-500 text-20 font-500 text-primary mb-2">
          Add image
        </h1>
        <FileUpload setSelectedFile={setFile} imageUrl={imageUrl} />
      </div>
      <div className="flex-1">
        <ResForm
          onSubmit={onSubmit}
          resolver={zodResolver(landlordSchema.createLandlord)}
        >
          <ResInput
            size="large"
            type="text"
            name="username"
            placeholder="enter user name"
            label="Enter user name"
          />
          <ResInput
            size="large"
            type="text"
            name="name"
            placeholder="enter full name"
            label="Enter full name"
          />
          <ResInput
            size="large"
            type="email"
            name="email"
            placeholder="enter email"
            label="Enter email"
          />
          <ResInput
            size="large"
            type="number"
            name="phoneNumber"
            placeholder="enter phone number"
            label="Enter phone number"
          />
          <ResSelect
            size="large"
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ]}
            name="gender"
            placeholder="select gender"
            label="Select gender"
          />
          <ResSelect
            size="large"
            options={[
              { label: "Under 800 KD", value: "Under 800 KD" },
              {
                label: "Between 800 - 1499 KD",
                value: "Between 800 - 1499 KD",
              },
              {
                label: "Between 1500 - 3000 KD",
                value: "Between 1500 - 3000 KD",
              },
              {
                label: "Between 1500 - 3000 KD",
                value: "Between 1500 - 3000 KD",
              },
              {
                label: "Over 3000 KD",
                value: "Over 3000 KD",
              },
            ]}
            name="monthlyIncome"
            placeholder="select monthly income"
            label="Select monthly income"
          />
          <ResInput
            size="large"
            type="text"
            name="password"
            placeholder="enter password"
            label="Enter password"
          />
          <Button
            htmlType="submit"
            className="w-full bg-primary text-white font-medium h-[40px]"
          >
            SUBMIT
          </Button>
        </ResForm>
      </div>
    </div>
  );
};

export default CreateHost;
