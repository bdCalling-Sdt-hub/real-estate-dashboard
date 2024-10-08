/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useState } from "react";
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
  value?: string | number; // Accept value as a prop
  onChange?: (value: string | number) => void; // Accept onChange as a prop
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
  value, // Add value prop
  onChange, // Add onChange prop
  mode,
  showSearch = false,
}: SelectProps) => {
  const [internalValue, setInternalValue] = useState<
    string | number | undefined
  >(defaultValue);

  const handleChange = (val: string | number) => {
    setInternalValue(val);
    if (onChange) {
      onChange(val); // Call the passed onChange function if provided
    }
  };

  return (
    <Controller
      name={name}
      render={({
        field: { onChange: formOnChange },
        fieldState: { error },
      }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : ""}
          help={error ? error.message : ""}
        >
          <Select
            value={value !== undefined ? value : internalValue} // Use the prop value if provided
            mode={mode}
            showSearch={showSearch}
            defaultValue={defaultValue}
            size={size}
            options={options}
            onChange={(val) => {
              handleChange(val); // Update local state and call the external onChange handler
              formOnChange(val); // Update the form state
            }}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    />
  );
};

export default ResSelect;
