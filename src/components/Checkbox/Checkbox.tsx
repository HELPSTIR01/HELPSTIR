// Checkbox.tsx
import React, { useMemo } from 'react';
import './Checkbox.scss';

interface CheckboxProps {
  checked: boolean;
  text: string;
  onClick?: () => void;
  onChange?: (checked: boolean) => void;
  className?: string;
  toggle?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  text,
  onClick = () => {},
  onChange = () => {},
  className = '',
  toggle = false,
}) => {
  const checkboxClassName = useMemo(() => {
    return `checkbox ${toggle ? 'checkbox--toggle' : ''} ${className}`.trim();
  }, [toggle, className]);

  return (
    <label className={checkboxClassName}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        onClick={onClick}
      />
      <span className="checkbox__checkmark"></span>
      <span className="checkbox__text">{text}</span>
    </label>
  );
};

export default Checkbox;