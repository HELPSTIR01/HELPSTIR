import React from 'react';
import './SubmitButton.scss';

interface SubmitButtonProps {
  text?: string;
  onClick: () => void;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text = 'Continue',
  onClick,
  className = ''
}) => {
  return (
    <div className={`submit-button-container ${className}`}>
      <span className="button-text">{text}</span>
      <button className="circle-button" onClick={onClick}>
        <span className="arrow">→</span>
      </button>
    </div>
  );
};