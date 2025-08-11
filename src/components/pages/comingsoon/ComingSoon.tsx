import React from "react";
import "./ComingSoon.scss";

interface HelpstirFormData {}
const mockFormData: HelpstirFormData = {};
const ComingSoon: React.FC<{ formData: HelpstirFormData }> = () => {
  return <div className="helpstir-coming-soon"></div>;
};

export default ComingSoon;
