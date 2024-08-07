import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import ResForm from "../../../component/Form/FormProvider";
import ResInput from "../../../component/Form/ResInput";

const EditSubAdmin = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    
  };
  return (
    <div>
      <ResForm onSubmit={onSubmit}>
        <ResInput
          type="text"
          name="name"
          placeholder="enter name"
          label="Enter Name"
        />
        <ResInput
          type="email"
          name="email"
          placeholder="enter email"
          label="Enter Email"
        />
        <ResInput
          type="number"
          name="number"
          placeholder="enter number"
          label="Enter Number"
        />

        <Button className="bg-primary font-500 text-white  w-full">
          Create
        </Button>
      </ResForm>
    </div>
  );
};

export default EditSubAdmin;
