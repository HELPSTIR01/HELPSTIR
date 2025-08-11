// components/RegistrationForm/RegistrationForm.tsx
"use client";
import React, { useState } from "react";
import { FormInput } from "@/components/FormInput/FormInput";
import "./RegistrationForm.scss";
import Image from "next/image";
import { SubmitButton } from "@/components/Button/SubmitButton";
import { addNgo, getClient } from "@/helpers.ts/supabase";
import { NGO } from "@/types/ngo.types";
import Congratulation from "@/containers/congratulation";

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<NGO>({
    name: "",
    ngo_name: "",
    area: "",
    bio: "",
    city: "",
    number: 0,
    email: "",
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

    // Validate ngo_name (should not be empty)
    if (!formData.ngo_name.trim()) {
      errors.ngo_name = "NGO Name is required.";
      isClean = false;
    }

    // Validate area (should not be empty)
    if (!formData.area.trim()) {
      errors.area = "Area is required.";
      isClean = false;
    }

    // Validate bio (optional, but if present, should be at least 10 characters)
    if (formData.bio && formData.bio.length < 10) {
      errors.bio = "Bio should be at least 10 characters long.";
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
    }
    setStep(1);
  };
  const handleNgo = async () => {
    const errors: any = {};
    let isClean = true;
    // Validate number (should be a valid 10-digit number)
    if (!/^\d{10}$/.test(`${formData.number}`)) {
      errors.number = "Number should be a valid 10-digit phone number.";
      isClean = false;
    }

    // Validate email (should be a valid email format)
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Invalid email address.";
      isClean = false;
    }

    if (!isClean) {
      setErrors(errors);
      return;
    }
    const client = await getClient();
    const ngo: NGO = {
      ...formData,
    };

    addNgo(ngo, client)
      .then(() => setStep(2))
      .catch(console.log);
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
              label="Your Full Name"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              placeholder="Enter your name"
              error={error?.name}
            />
            <FormInput
              label="NGO Name"
              value={formData.ngo_name}
              onChange={(value) =>
                setFormData({ ...formData, ngo_name: value })
              }
              placeholder="Enter your NGO name"
              required
              error={error?.ngo_name}
            />
            <FormInput
              label="What are you working towards"
              value={formData.area}
              onChange={(value) => setFormData({ ...formData, area: value })}
              placeholder="Fields of expertise"
              required
              error={error?.area}
            />

            <FormInput
              label="Tell us more specifically"
              value={formData.bio}
              onChange={(value) => setFormData({ ...formData, bio: value })}
              placeholder="a little bit more about you"
              required
              error={error?.bio}
            />
            <FormInput
              label="City You Live In"
              value={formData.city}
              onChange={(value) => setFormData({ ...formData, city: value })}
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
          <label className="main"> One last thing</label>
          <div className="form-grid">
            <FormInput
              label="Contact Number"
              value={formData.number}
              onChange={(value) =>
                setFormData({ ...formData, number: parseInt(value) })
              }
              placeholder="Enter your number"
              info="we will use this number to contact you to get you onboard on this
              number"
              error={error?.number}
            />

            <FormInput
              label="Email address"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              placeholder="Enter your email"
              required
              info="Formal updates come to you here from us"
              error={error?.email}
            />
          </div>
        </div>
        <Image
          src="/images/zigzagline.svg"
          alt="zigzag"
          width={400}
          height={100}
        />

        <SubmitButton onClick={handleNgo} />
      </div>
    );
  }
  if (step == 2) {
    return <Congratulation />;
  }
};
