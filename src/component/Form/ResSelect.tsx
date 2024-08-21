/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { Controller } from "react-hook-form";
interface OptionsProps {
  value: string | number;
  label: string;
  disabled?: boolean;
}
interface SelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  size?: SizeType;
  options: OptionsProps[];
  defaultValue?: string;
  mode?: any;
  showSearch?: boolean;
}

const ResSelect = ({
  name,
  label,
  placeholder,
  options,
  size,
  defaultValue,
  mode,
  showSearch = false,
}: SelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <Select
            mode={mode}
            showSearch={showSearch}
            defaultValue={defaultValue}
            size={size}
            options={options}
            onChange={onChange}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    />
  );
};

export default ResSelect;
