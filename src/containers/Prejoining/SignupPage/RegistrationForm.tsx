// components/RegistrationForm/RegistrationForm.tsx
"use client";
import React, { useState } from "react";
import { FormInput } from "@/components/FormInput/FormInput";
import { FormDropdown } from "@/components/FormDropdown/FormDropdown";
import "./RegistrationForm.scss";
import Image from "next/image";
import { SubmitButton } from "@/components/Button/SubmitButton";
import { addUser, getClient } from "@/helpers.ts/supabase";
import { User } from "@/types/user.types";
import Congratulation from "@/containers/congratulation";

export const RegistrationForm = ({ mode }: { mode: string | undefined }) => {
  const [formData, setFormData] = useState<User>({
    name: "",
    gender: "",
    email: "",
    city: "",
    userid: "",
  });

  const [step, setStep] = useState(0);
  const [error, setErrors] = useState<any>(null);
  const handleSubmit = async () => {
    const errors: any = {};
    let isClean = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
      isClean = false;
    }

    // Validate number (should be a valid 10-digit number)
    if (!/^\d{10}$/.test(`${formData.number}`)) {
      errors.number = "Phone number should be a valid 10-digit number.";
      isClean = false;
    }

    // Validate email (should be a valid email format)
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email as string)) {
      errors.email = "Invalid email address.";
      isClean = false;
    }

    // Validate city (should not be empty)
    if (!formData.city.trim()) {
      errors.city = "City is required.";
      isClean = false;
    }

    if (!isClean) {
      setErrors(errors);
      return;
    } else {
      setStep(1);
    }
  };
  const [gender, setGender] = useState("");
  const addUserValues = async () => {
    const client = await getClient();
    const user: User = {
      name: formData.name,
      number: parseInt(`${formData.number}`),
      gender:
        formData.gender === "Other" ? `Other: ${gender}` : formData.gender,
      email: formData.email,
      city: formData.city,
      userid: formData.userid,
    };
    addUser(user, client)
      .then(() => setStep(2))
      .catch(console.log);
  };
  const setGenderValue = (e: any) => {
    setGender(e.target.value);
  };
  if (step === 0) {
    return (
      <div className="registration-container">
        <div className="brand">
          <img src="/images/logo.svg" alt="helpstir" />
        </div>
        <div className="flex-mid">
          <div className="form-grid">
            <FormInput
              label="Name"
              value={formData.name}
              onChange={(value: any) =>
                setFormData({ ...formData, name: value })
              }
              placeholder="Enter your name"
              error={error?.name}
            />
            <FormInput
              label="Phone Number"
              value={`${formData.number ?? ""}`}
              onChange={(value: any) => {
                var reg = /^\d+$/;
                if (!reg.test(value)) return;
                setFormData({ ...formData, number: value });
              }}
              placeholder="Enter your number"
              required
              prefix="+91"
              error={error?.number}
            />
            <div>
              <FormDropdown
                label="Gender"
                value={formData.gender}
                placeholder="Select your Gender"
                onChange={(value: any) =>
                  setFormData({ ...formData, gender: value })
                }
                options={[
                  "Male",
                  "Female",
                  "Non-Binary",
                  "Prefer not to say",
                  "Other",
                ]}
                error={error?.gender}
              >
                {formData.gender === "Other" && (
                  <FormInput
                    label=""
                    value={gender}
                    type="text"
                    placeholder="Please specify, help us know you better"
                    onChange={setGenderValue}
                  />
                )}
              </FormDropdown>
            </div>

            <FormInput
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value: any) =>
                setFormData({ ...formData, email: value })
              }
              placeholder="Enter your email"
              required
              error={error?.email}
            />
            <FormInput
              label="City You Live In"
              value={formData.city}
              onChange={(value: any) =>
                setFormData({ ...formData, city: value })
              }
              placeholder="Enter your city name"
              required
              error={error?.city}
            />
          </div>
        </div>
        <Image
          src="/images/zigzagline.svg"
          alt="zigzag"
          width={400}
          height={100}
        />

        <SubmitButton onClick={handleSubmit} />
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="registration-container step2">
        <div className="brand">
          <img src="/images/logo.svg" alt="helpstir" />
        </div>
        <div className="flex-mid">
          <div className="creative">
            <img src="/images/creative-bug.svg" alt="creative-bug" />
            <span>Get Creative!</span>
          </div>
          <p className="main"> Book your unique Helpstir id! </p>
          <div className="form-grid min">
            <FormInput
              label=""
              value={formData.userid}
              onChange={(value: any) =>
                setFormData({ ...formData, userid: value })
              }
              placeholder="Enter your name"
              error={error?.userid}
            />
          </div>
        </div>
        <Image
          src="/images/zigzagline.svg"
          alt="zigzag"
          width={400}
          height={100}
        />

        <SubmitButton onClick={addUserValues} />
      </div>
    );
  }
  if (step == 2) {
    return (
      <Congratulation message="Get ready for quirky updates, insider launch secrets, and all the community buzz from day one!" />
    );
  }
};
