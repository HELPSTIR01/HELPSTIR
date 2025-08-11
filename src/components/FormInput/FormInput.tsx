import React, { useMemo } from "react";
import "./FormInput.scss";
import { IoInformationCircle } from "react-icons/io5";

interface FormInputProps {
  label: string;
  value: string | String | any;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  prefix?: string;
  info?: string;
  error?: string;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  prefix,
  info = "",
  error = "",
  type = "text",
}) => {
  const _value = useMemo(() => {
    if (prefix) return prefix + " " + value;
  }, [value]);
  const onChangeWrapper = (e: any) => {
    const value = e?.target?.value?.replace(`${prefix} `, "");
    onChange(value);
  };
  return (
    <div className="form-input">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="input-container">
        <input
          type={type}
          value={_value}
          onChange={onChangeWrapper}
          placeholder={placeholder}
        />
        {info && (
          <span className="info">
            <IoInformationCircle />
            {info}
          </span>
        )}
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};
