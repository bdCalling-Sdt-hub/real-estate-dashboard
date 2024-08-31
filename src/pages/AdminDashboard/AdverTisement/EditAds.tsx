/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  useGetAdsCategoriesQuery,
  useGetSingleAdsQuery,
  useUpdateAdsMutation,
} from "../../../redux/features/ads/adsApi";
import { adsVelidation } from "../../../schema/ads.schema";

/* eslint-disable @typescript-eslint/no-explicit-any */
const EditAds = ({ setShow, id }: any) => {
  const { setFile, imageUrl, imageFile } = UseImageUpload();
  const [updateAds] = useUpdateAdsMutation();
  const { data: singleAds } = useGetSingleAdsQuery(id);
  const { data: adsCategoryData } = useGetAdsCategoriesQuery({});
  const categorydata = adsCategoryData?.data?.data?.map((data: any) => {
    return {
      label: data?.name,
      value: data?._id,
    };
  });

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating....");
    const formData = new FormData();

    try {
      formData.append("banner", imageFile as File);
      formData.append("data", JSON.stringify(data));
      await updateAds({ id: singleAds?.data?._id, body: formData }).unwrap();
      toast.success("Ads edited successfully", {
        id: toastId,
        duration: 2000,
      });
      setShow((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };
  return (
    <div>
      <div className="text-center">
        <FileUpload
          setSelectedFile={setFile}
          imageUrl={imageUrl ?? singleAds?.data?.banner}
        />
      </div>
      <ResForm
        onSubmit={onsubmit}
        defaultValues={singleAds?.data}
        resolver={zodResolver(adsVelidation.editschema)}
      >
        <ResSelect
          size="large"
          options={categorydata}
          label="Select category"
          placeholder="select category"
          name="category"
        />
        <ResInput
          type="text"
          size="large"
          name="contactLink"
          placeholder="enter url link"
          label="Enter Url"
        />

        <Button
          htmlType="submit"
          className="bg-primary text-white w-full h-[40px]"
        >
          EDIT
        </Button>
      </ResForm>
    </div>
  );
};

export default EditAds;