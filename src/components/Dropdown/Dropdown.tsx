// Dropdown.tsx
import React, { useMemo, useState } from "react";
import "./Dropdown.scss";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  multiple?: boolean;
  open?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select",
  label,
  className = "",
  multiple = false,
  open = false,
}) => {
  const [isOpen, setIsopen] = useState(open);
  const [haveText, setHaveText] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>(
    Array.isArray(value) ? value : []
  );

  const dropdownClassName = useMemo(() => {
    return `dropdown ${className}`.trim();
  }, [className]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (multiple) {
      if (!selectedItems.includes(selectedValue)) {
        const newSelectedItems = [...selectedItems, selectedValue];
        setSelectedItems(newSelectedItems);
        onChange(newSelectedItems);
      }
    } else {
      onChange(selectedValue);
    }
  };

  const handleRemoveItem = (item: string) => {
    const newSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== item
    );
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  return (
    <div className={dropdownClassName}>
      {label && <label className="dropdown__label">{label}</label>}

      <button
        className="dropdown__select"
        value={multiple ? "" : (value as string)}
      >
        {placeholder && !multiple && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        <div>
          {options
            .filter(
              (option) => !multiple || !selectedItems.includes(option.value)
            )
            .map((option) => (
              <button key={option.value} value={option.value}>
                {option.label}
              </button>
            ))}
        </div>
      </button>
      {selectedItems.length > 0 && (
        <div className="dropdown__selected-items">
          {selectedItems.map((item) => (
            <div key={item} className="dropdown__selected-item">
              {options.find((option) => option.value === item)?.label}
              <button
                type="button"
                onClick={() => handleRemoveItem(item)}
                className="dropdown__remove-button"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
