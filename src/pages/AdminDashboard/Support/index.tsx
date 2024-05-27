import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { MdDoneOutline } from "react-icons/md";

const Support = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const onSubmit = async () => {};
  return (
    <div className="container mx-auto">
      <h1 className="text-20 text-gray font-500 mb-2">Support</h1>
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
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Support;
