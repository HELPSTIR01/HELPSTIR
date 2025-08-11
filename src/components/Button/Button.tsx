// Button.tsx
import React, { useMemo } from 'react';
import './Button.scss';

interface ButtonProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  label: string;
}

const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  className = '',
  onClick,
  loading = false,
  disabled = false,
  icon,
  variant = 'primary',
  label,
}) => {
  const buttonClassName = useMemo(() => {
    return `button button--${size} button--${variant} ${className}`.trim();
  }, [size, variant, className]);

  const buttonIcon = useMemo(() => {
    return icon && <span className="button__icon">{icon}</span>;
  }, [icon]);

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className="button__loader"></span>}
      {buttonIcon}
      <span className="button__label">{label}</span>
    </button>
  );
};

export default Button;