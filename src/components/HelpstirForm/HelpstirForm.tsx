"use client";

import React, { useState } from "react";
import { z } from "zod";
import Button from "../Button/Button";
import Stepper, { StepContent } from "../Stepper/Stepper";
import BasicDetails from "./BasicDetails";
import OtherInformation from "./OtherInformation";
import { addOrganization } from "@/services/organization";
import "./HelpstirForm.scss";

export interface HelpstirFormData {
  organizationName: string;
  email: string;
  registeredAddress: string;
  city: string;
  pinCode: string;
  state: string;
  mobileNo: string;
  locationPin: string;
  hasParentOrg: boolean;
  parentOrg?: {
    name: string;
    email: string;
    address: string;
  };
  causes: string[];
  specificAreas: string[];
  bio: string;
  accountManager: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
}

export const initialFormData: HelpstirFormData = {
  organizationName: "",
  email: "",
  registeredAddress: "",
  city: "",
  pinCode: "",
  state: "",
  mobileNo: "",
  locationPin: "",
  hasParentOrg: false,
  parentOrg: {
    name: "",
    email: "",
    address: "",
  },
  causes: [],
  specificAreas: [],
  bio: "",
  accountManager: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

export const stateOptions = [
  { value: "delhi", label: "Delhi" },
  { value: "mumbai", label: "Mumbai" },
  { value: "bangalore", label: "Bangalore" },
  { value: "chennai", label: "Chennai" },
];

export const causeOptions = [
  { value: "cause1", label: "Cause 1" },
  { value: "cause2", label: "Cause 2" },
  { value: "cause3", label: "Cause 3" },
  { value: "cause4", label: "Cause 4" },
];

export const areaOptions = [
  { value: "area1", label: "Area 1" },
  { value: "area2", label: "Area 2" },
  { value: "area3", label: "Area 3" },
  { value: "area4", label: "Area 4" },
];

// Define a validation schema
const validationSchema = z.object({
  organizationName: z
    .string()
    .min(3, { message: "Minimum 3 characters required" })
    .nonempty({ message: "Organization name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .nonempty({ message: "Email is required" }),
  registeredAddress: z
    .string()
    .nonempty({ message: "Registered address is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  pinCode: z
    .string()
    .length(6, { message: "Pin code must be 6 digits" })
    .nonempty({ message: "Pin code is required" }),
  state: z.string().nonempty({ message: "State is required" }),
  mobileNo: z
    .string()
    .length(10, { message: "Mobile number must be 10 digits" })
    .nonempty({ message: "Mobile number is required" }),
  locationPin: z.string().nonempty({ message: "Location pin is required" }),
  hasParentOrg: z.boolean(),
  parentOrg: z
    .object({
      name: z
        .string()
        .min(3, { message: "Minimum 3 characters required" })
        .nonempty({ message: "Parent organization name is required" }),
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" }),
      address: z.string().nonempty({ message: "Address is required" }),
    })
    .optional(),
  causes: z
    .array(z.string().nonempty({ message: "Causes are required" }))
    .nonempty({ message: "At least one cause is required" }),
  specificAreas: z
    .array(z.string().nonempty({ message: "Specific areas are required" }))
    .nonempty({ message: "At least one specific area is required" }),
  bio: z
    .string()
    .min(10, { message: "Minimum 10 characters required" })
    .nonempty({ message: "Bio is required" }),
  accountManager: z.object({
    name: z
      .string()
      .min(3, { message: "Minimum 3 characters required" })
      .nonempty({ message: "Account manager name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .nonempty({ message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .nonempty({ message: "Password is required" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm password is required" }),
    // .refine((val: any, obj: { password: any; }) => val === obj.password, {
    //   message: "Passwords do not match",
    // }),
  }),
});

const HelpstirForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<HelpstirFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<HelpstirFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const steps = [
    { label: "Basic details" },
    { label: "Other required information" },
  ];

  const handleInputChange = (field: keyof HelpstirFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    validationSchema
      // .pick({ [field]: validationSchema.shape[field] })
      .parseAsync({ [field]: value })
      .then(() => {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      })
      .catch((err) => {
        setErrors((prev) => ({
          ...prev,
          [field]: err.errors[0],
        }));
      });
  };

  const handleAccountManagerChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      accountManager: {
        ...prev.accountManager,
        [field]: value,
      },
    }));
  };

  const handleParentOrgChange = (field: string, value: string) => {
    if (formData.hasParentOrg) {
      setFormData((prev) => ({
        ...prev,
        parentOrg: {
          ...prev.parentOrg!,
          [field]: value,
        },
      }));
    }
  };

  const isFormValid = async () => {
    try {
      await validationSchema.parseAsync(formData);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      if (await isFormValid()) {
        setIsSubmitting(true);
        setSubmitError(null);
        
        // Submit form data to the backend via GraphQL
        const result = await addOrganization(formData);
        
        console.log('Organization added successfully:', result);
        
        // Redirect to success page
        window.location.href = "/comingsoon";
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="helpstir-container">
      <div className="helpstir-form">
        <div className="helpstir-form__header">
          <img src="/images/logo.svg" alt="helpstir" />

          <p className="helpstir-form__subtitle">
            Let&apos;s get started with creating your HELPSTiR account!
          </p>
        </div>

        <Stepper steps={steps} active={currentStep}>
          <StepContent stepIndex={0} currentStep={currentStep}>
            <BasicDetails
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleParentOrgChange={handleParentOrgChange}
            />
          </StepContent>
          <StepContent stepIndex={1} currentStep={currentStep}>
            <OtherInformation
              formData={formData}
              errors={errors}
              handleInputChange={handleInputChange}
              handleAccountManagerChange={handleAccountManagerChange}
            />
          </StepContent>

          <div className="form-actions">
            {currentStep === 1 && (
              <Button
                variant="secondary"
                label="Previous"
                onClick={() => setCurrentStep(0)}
                disabled={isSubmitting}
              />
            )}
            <Button
              variant="primary"
              label={currentStep === 1 ? (isSubmitting ? "Submitting..." : "Submit & create account") : "Next"}
              onClick={
                currentStep === 1 ? handleSubmit : () => setCurrentStep(1)
              }
              disabled={isSubmitting || Object.values(errors).some(
                (error) => error !== undefined
              )}
            />
          </div>
          
          {submitError && (
            <div className="form-error">
              {submitError}
            </div>
          )}
        </Stepper>
      </div>
    </div>
  );
};

export default HelpstirForm;






