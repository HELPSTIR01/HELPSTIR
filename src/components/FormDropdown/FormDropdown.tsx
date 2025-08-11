import React, { useEffect, useMemo, useRef, useState } from "react";
import "./FormDropdown.scss";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import useOutsideClick from "@/hooks/useOutsideclick";

interface FormDropdownProps {
  label: string;
  value: string | String | any;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  error?: string;
  defaultopen?: boolean;
  placeholder?: string;
  children?: any;
}

export const FormDropdown: React.FC<FormDropdownProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  error = "",
  placeholder = "",
  defaultopen = false,
  children = null,
}) => {
  const [open, isOpen] = useState(defaultopen);
  const toggle = () => {
    isOpen((prev) => !prev);
  };
  const dropdownRef = useRef(null);
  useOutsideClick(dropdownRef, () => isOpen(false));

  useEffect(() => {
    isOpen(false);
  }, [value]);
  const formClassName = useMemo(() => {
    const className = "selected-item";
    if (value) return className + " value";
    return className;
  }, []);
  return (
    <div className="form-dropdown">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <div className="select-container">
        <button className={formClassName} value={value} onClick={toggle}>
          {value || placeholder}
          <IoChevronDownCircleOutline />
        </button>
        {open && (
          <div className="options" ref={dropdownRef}>
            {options.map((option) => (
              <button
                key={option}
                value={option}
                className={option === value ? "active" : ""}
                onClick={onChange.bind(null, option)}
              >
                <input
                  type="radio"
                  checked={option === value}
                  onChange={() => {}}
                />{" "}
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && <span className="error">{error}</span>}
      {children}
    </div>
  );
};
