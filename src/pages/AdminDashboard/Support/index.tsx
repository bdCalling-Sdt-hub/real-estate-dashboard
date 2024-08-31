import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdDoneOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import {
  useGetContentsQuery,
  useUpdateContentMutation,
} from "../../../redux/features/content/contentApi";

const Support = () => {
  const { t } = useTranslation();
  const editor = useRef(null);
  const { data: data, isSuccess } = useGetContentsQuery({});
  const [updateAboutFn, { isLoading }] = useUpdateContentMutation();
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setContent(data?.data?.data[0]?.supports);
    }
  }, [isSuccess, data]);
  if (isLoading) {
    toast.loading("Loading...", { id: "content" });
  }
  const onSubmit = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await updateAboutFn({ supports: content }).unwrap();
      if (res?.success) {
        toast.success("Support is updated", { id: "content" });
        navigate("/admin/setting");
      } else {
        toast.success(res?.message, { id: "content" });
      }
    } catch (error) {
      ErrorResponse(error, "content");
    }
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-20 text-gray font-500 mb-2">{t("Support")}</h1>
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
          className="bg-primary text-white flex items-center border-0 font-600 "
          size="large"
          icon={<MdDoneOutline />}
        >
          {t("Submit")}
        </Button>
      </div>
    </div>
  );
};

export default Support;
