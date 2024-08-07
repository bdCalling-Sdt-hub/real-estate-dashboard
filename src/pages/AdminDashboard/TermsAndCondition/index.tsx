/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDoneOutline } from "react-icons/md";
import { useGetContentsQuery, useUpdateContentMutation } from "../../../redux/features/content/contentApi";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const editor = useRef(null);
  const { data: data, isSuccess } = useGetContentsQuery({})
  const [updateAboutFn, { isLoading }] = useUpdateContentMutation()
  const [content, setContent] = useState("");
const navigate = useNavigate();

  useEffect(() => {

    if (isSuccess) {
      setContent(data?.data?.data[0].termsAndConditions
      )
    }
  }, [isSuccess, data])
  if (isLoading) {
    toast.loading("Loading...", { id: "content" })
  }
  const onSubmit = async () => {
    try {
      const res: any = await updateAboutFn({ termsAndConditions: content })
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: "content" })
         navigate("/admin/setting");
      }
    } catch (error) {
      ErrorResponse(error, "content")
    }
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-20 text-gray font-500 mb-2">
        {t("Terms and Condition")}
      </h1>
      <JoditEditor
        // config={{
        //   height: "600px",
        // }}
        ref={editor}
        value={content}
        onChange={(newContent) => setContent(newContent)}
      />
      <div className="flex justify-end mt-4">
        <Button
          onClick={onSubmit}
          className="bg-primary flex items-center border-0 font-600 "
          size="large"
          icon={<MdDoneOutline />}
        >
          {t("Submit")}
        </Button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
