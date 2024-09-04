/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import moment from "moment";
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
import { adsValidation } from "../../../schema/ads.schema";

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
    const toastId = toast.loading(t("Creating...."));

    const formData = new FormData();
    if (!imageUrl) {
      toast.error(t("Please select a banner"), { id: toastId, duration: 2000 });
      return;
    }

    try {
      formData.append("banner", imageFile as File);

      // Calculate the expire date based on data.expireDate
      let expireDate;
      if (data.expireDate === "1") {
        expireDate = moment().add(1, "months").format("YYYY-MM-DD");
      } else if (data.expireDate === "3") {
        expireDate = moment().add(3, "months").format("YYYY-MM-DD");
      } else if (data.expireDate === "12") {
        expireDate = moment().add(1, "years").format("YYYY-MM-DD");
      }

      // Add the calculated expire date to the data
      data.expireDate = expireDate;

      formData.append("data", JSON.stringify(data));
      await createAds(formData).unwrap();
      toast.success(t("Ads inserted successfully"), {
        id: toastId,
        duration: 2000,
      });
      setShow((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  const duration = [
    { label: t("1 Months"), value: "1" },
    { label: t("3 Months"), value: "3" },
    { label: t("1 Year"), value: "12" },
  ];
  return (
    <div>
      <div className="text-center">
        <FileUpload setSelectedFile={setFile} imageUrl={imageUrl} />
      </div>
      <ResForm
        onSubmit={onsubmit}
        resolver={zodResolver(adsValidation.insertAds)}
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
        <ResSelect
          options={duration}
          size="large"
          name="expireDate"
          placeholder={t("Select duration")}
          label={t("Select duration")}
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
