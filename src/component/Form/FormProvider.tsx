/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
// import { toast } from "sonner";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  disabled?: boolean;
} & TFormConfig;

const ResForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
  disabled = false,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  // set default value-------------------------
  const methods = useForm(formConfig);
  // const {
  //   // formState: { dirtyFields },
  // } = methods;
  useEffect(() => {
    if (defaultValues) {
      // Set default values after form is mounted
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const submit: SubmitHandler<FieldValues> = (data) => {
    // if (Object.keys(dirtyFields).length === 0 ) {
    //   toast.warning("Please update some values before submitting..");
    //   return;
    // }
    onSubmit(data);
    // methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        disabled={disabled}
        onFinish={methods.handleSubmit(submit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default ResForm;
