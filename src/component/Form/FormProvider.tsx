/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const ResForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  // set default value-------------------------
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    // methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};
// Function to transform default values
// const transformDefaultValues = (
//   defaultValues: Record<string, any> | undefined
// ) => {
//   if (!defaultValues) return defaultValues;
//   const transformedValues: Record<string, any> = {};
//   for (const key in defaultValues) {
//     if (Object.hasOwnProperty.call(defaultValues, key)) {
//       const value = defaultValues[key];
//       transformedValues[key] =
//         value === "" || value === null ? undefined : value;
//     }
//   }

//   return transformedValues;
// };

export default ResForm;
