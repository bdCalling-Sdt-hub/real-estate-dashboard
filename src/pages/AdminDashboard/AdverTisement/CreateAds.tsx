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
import {
  useCreateadsMutation,
  useGetAdsCategoriesQuery,
} from "../../../redux/features/ads/adsApi";
import { adsVelidation } from "../../../schema/ads.schema";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CreateAds = ({ setShow }: any) => {
  const { t } = useTranslation();
  const { setFile, imageUrl, imageFile } = UseImageUpload();
  const [createAds] = useCreateadsMutation();
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
    if (!imageUrl) {
      toast.error("Please select a banner", { id: toastId, duration: 2000 });
      return;
    }

    try {
      formData.append("banner", imageFile as File);
      formData.append("data", JSON.stringify(data));
      await createAds(formData).unwrap();
      toast.success("Ads inserted successfully", {
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
        <FileUpload setSelectedFile={setFile} imageUrl={imageUrl} />
      </div>
      <ResForm
        onSubmit={onsubmit}
        resolver={zodResolver(adsVelidation.insertAds)}
      >
        <ResSelect
          size="large"
          options={categorydata}
          label={t("Select category")}
          placeholder={t("Select category")}
          name="category"
        />
        <ResInput
          type="text"
          size="large"
          name="contactLink"
          placeholder={t("Enter url")}
          label={t("Enter url")}
        />

        <Button
          htmlType="submit"
          className="bg-primary text-white w-full h-[40px]"
        >
          {t("Submit")}
        </Button>
      </ResForm>
    </div>
  );
};

export default CreateAds;
