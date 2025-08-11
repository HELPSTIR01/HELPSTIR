// ComponentDemo.tsx
"use client";
import React, { useState } from "react";
import Checkbox from "../Checkbox/Checkbox";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import Stepper, { StepContent } from "../Stepper/Stepper";

const ComponentDemo: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferences: "",
    terms: false,
  });

  const dropdownOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const steps = [
    { label: "Personal Info" },
    { label: "Preferences" },
    { label: "Terms" },
    { label: "Review" },
    { label: "Complete" },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div className="component-demo">
        <h1>Component Demo</h1>

        <Stepper steps={steps} active={currentStep}>
          <StepContent stepIndex={0} currentStep={currentStep}>
            <div style={{ height: "300px", width: "400px" }}>
              <h2>Personal Information</h2>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
          </StepContent>

          <StepContent stepIndex={1} currentStep={currentStep}>
            <div style={{ height: "300px", width: "400px" }}>
              <h2>Your Preferences</h2>
              <Dropdown
                options={dropdownOptions}
                value={dropdownValue}
                onChange={(value) => setDropdownValue(value as string)}
                placeholder="Select your preferences"
                label="Choose your preferences"
              />
            </div>
          </StepContent>

          <StepContent stepIndex={2} currentStep={currentStep}>
            <div style={{ height: "300px", width: "400px" }}>
              <h2>Terms & Conditions</h2>
              <Checkbox
                checked={checkboxChecked}
                text="I agree to the terms and conditions"
                onChange={(checked) => setCheckboxChecked(checked)}
              />
            </div>
          </StepContent>

          <StepContent stepIndex={3} currentStep={currentStep}>
            <div style={{ height: "300px", width: "400px" }}>
              <h2>Review Your Information</h2>
              <div>
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Preferences:</strong> {dropdownValue}
                </p>
                <p>
                  <strong>Terms Accepted:</strong>{" "}
                  {checkboxChecked ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </StepContent>

          <StepContent stepIndex={4} currentStep={currentStep}>
            <div style={{ height: "300px", width: "400px" }}>
              <h2>Complete!</h2>
              <p>Thank you for completing all steps!</p>
            </div>
          </StepContent>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "24px",
            }}
          >
            <Button
              size="medium"
              variant="secondary"
              label="Previous"
              onClick={handlePrevStep}
              disabled={currentStep === 0}
            />
            <Button
              size="medium"
              variant="primary"
              label={currentStep === steps.length - 1 ? "Finish" : "Next"}
              onClick={handleNextStep}
              disabled={currentStep === steps.length - 1}
            />
          </div>
        </Stepper>
      </div>
    </div>
  );
};

export default ComponentDemo;
