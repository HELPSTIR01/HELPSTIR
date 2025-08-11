"use client"

import React from 'react';
import './TextArea.scss';

interface TextAreaProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

const TextArea = ({
  value,
  onChange,
  placeholder,
  maxLength = 200,
  rows = 4
}: TextAreaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="textarea-wrapper">
      <textarea
        className="textarea"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
      />
      <div className="textarea__counter">
        {value?.length ?? 0}/{maxLength}
      </div>
    </div>
  );
};

export default TextArea;